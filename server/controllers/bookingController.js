import { Op } from 'sequelize';
import { Booking, Performer, User } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import { sendBookingNotification } from '../utils/email.js';

/**
 * @desc    Create booking
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = asyncHandler(async (req, res, next) => {
  const {
    performerId,
    eventDate,
    eventStartTime,
    eventEndTime,
    eventDuration,
    eventType,
    venue,
    venueAddress,
    eventDetails,
    guestCount,
    amount
  } = req.body;

  // Get performer
  const performer = await Performer.findByPk(performerId, {
    include: [{ model: User, as: 'user' }]
  });

  if (!performer) {
    return next(new AppError('Performer not found', 404));
  }

  if (performer.status !== 'approved') {
    return next(new AppError('This performer is not available for booking', 400));
  }

  // Calculate platform fee (15%)
  const platformFee = (parseFloat(amount) * 0.15).toFixed(2);
  const totalAmount = (parseFloat(amount) + parseFloat(platformFee)).toFixed(2);

  // Create booking
  const booking = await Booking.create({
    clientId: req.user.id,
    performerId,
    eventDate,
    eventStartTime,
    eventEndTime,
    eventDuration,
    eventType,
    venue,
    venueAddress,
    eventDetails,
    guestCount,
    amount,
    platformFee,
    totalAmount,
    status: 'pending'
  });

  // Send notification to performer
  try {
    await sendBookingNotification(booking, performer, req.user);
  } catch (error) {
    console.error('Error sending booking notification:', error);
  }

  // Emit socket event for real-time notification
  const io = req.app.get('io');
  io.to(`user-${performer.userId}`).emit('new-booking', {
    booking,
    client: req.user.getPublicProfile()
  });

  res.status(201).json({
    success: true,
    data: booking
  });
});

/**
 * @desc    Get all bookings (for current user)
 * @route   GET /api/bookings
 * @access  Private
 */
export const getBookings = asyncHandler(async (req, res, next) => {
  const { status, type } = req.query;
  let where = {};

  // Filter by user role
  if (req.user.role === 'performer') {
    const performer = await Performer.findOne({ where: { userId: req.user.id } });
    if (performer) {
      where.performerId = performer.id;
    }
  } else {
    where.clientId = req.user.id;
  }

  if (status) where.status = status;
  if (type === 'upcoming') {
    where.eventDate = { [Op.gte]: new Date() };
    where.status = { [Op.in]: ['pending', 'accepted'] };
  }
  if (type === 'past') {
    where.eventDate = { [Op.lt]: new Date() };
  }

  const bookings = await Booking.findAll({
    where,
    include: [
      {
        model: User,
        as: 'client',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatar']
      },
      {
        model: Performer,
        as: 'performer',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'email', 'phone', 'avatar']
          }
        ]
      }
    ],
    order: [['eventDate', 'DESC']]
  });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

/**
 * @desc    Get single booking
 * @route   GET /api/bookings/:id
 * @access  Private
 */
export const getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'client',
        attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'avatar']
      },
      {
        model: Performer,
        as: 'performer',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'email', 'phone', 'avatar']
          }
        ]
      }
    ]
  });

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Check authorization
  const performer = await Performer.findOne({ where: { userId: req.user.id } });
  const isClient = booking.clientId === req.user.id;
  const isPerformer = performer && booking.performerId === performer.id;
  const isAdmin = req.user.role === 'admin';

  if (!isClient && !isPerformer && !isAdmin) {
    return next(new AppError('Not authorized to view this booking', 403));
  }

  res.json({
    success: true,
    data: booking
  });
});

/**
 * @desc    Update booking status (accept/decline)
 * @route   PUT /api/bookings/:id/status
 * @access  Private
 */
export const updateBookingStatus = asyncHandler(async (req, res, next) => {
  const { status, cancellationReason } = req.body;

  const booking = await Booking.findByPk(req.params.id);

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Check authorization
  const performer = await Performer.findOne({ where: { userId: req.user.id } });
  const isClient = booking.clientId === req.user.id;
  const isPerformer = performer && booking.performerId === performer.id;

  if (!isClient && !isPerformer) {
    return next(new AppError('Not authorized to update this booking', 403));
  }

  // Validate status transitions
  if (status === 'accepted' && !isPerformer) {
    return next(new AppError('Only the performer can accept bookings', 403));
  }

  if (status === 'accepted') {
    booking.acceptedAt = new Date();
  }

  if (status === 'cancelled') {
    booking.cancelledBy = req.user.id;
    booking.cancelledAt = new Date();
    if (cancellationReason) {
      booking.cancellationReason = cancellationReason;
    }
  }

  if (status === 'completed') {
    booking.completedAt = new Date();
    // Increment performer's total bookings
    if (performer) {
      performer.totalBookings += 1;
      await performer.save();
    }
  }

  booking.status = status;
  await booking.save();

  // Emit socket event
  const io = req.app.get('io');
  const recipientId = isPerformer ? booking.clientId : performer.userId;
  io.to(`user-${recipientId}`).emit('booking-updated', booking);

  res.json({
    success: true,
    data: booking
  });
});

/**
 * @desc    Delete booking
 * @route   DELETE /api/bookings/:id
 * @access  Private
 */
export const deleteBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.id);

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  if (booking.clientId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this booking', 403));
  }

  await booking.destroy();

  res.json({
    success: true,
    data: {}
  });
});
