import { Op } from 'sequelize';
import { User, Performer, Booking, Review } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import sequelize from '../config/database.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private/Admin
 */
export const getStats = asyncHandler(async (req, res, next) => {
  const totalUsers = await User.count();
  const totalPerformers = await Performer.count();
  const totalBookings = await Booking.count();
  const totalRevenue = await Booking.sum('totalAmount', {
    where: { paymentStatus: 'paid' }
  });

  const pendingPerformers = await Performer.count({
    where: { status: 'pending' }
  });

  const pendingReviews = await Review.count({
    where: { status: 'pending' }
  });

  const recentBookings = await Booking.findAll({
    limit: 10,
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: User,
        as: 'client',
        attributes: ['firstName', 'lastName', 'email']
      },
      {
        model: Performer,
        as: 'performer',
        attributes: ['stageName']
      }
    ]
  });

  res.json({
    success: true,
    data: {
      totalUsers,
      totalPerformers,
      totalBookings,
      totalRevenue: totalRevenue || 0,
      pendingPerformers,
      pendingReviews,
      recentBookings
    }
  });
});

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 20, search, role, isActive } = req.query;
  const offset = (page - 1) * limit;

  const where = {};
  if (search) {
    where[Op.or] = [
      { email: { [Op.iLike]: `%${search}%` } },
      { firstName: { [Op.iLike]: `%${search}%` } },
      { lastName: { [Op.iLike]: `%${search}%` } }
    ];
  }
  if (role) where.role = role;
  if (isActive !== undefined) where.isActive = isActive === 'true';

  const { count, rows: users } = await User.findAndCountAll({
    where,
    attributes: { exclude: ['password'] },
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  res.json({
    success: true,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    data: users
  });
});

/**
 * @desc    Update user status
 * @route   PUT /api/admin/users/:id/status
 * @access  Private/Admin
 */
export const updateUserStatus = asyncHandler(async (req, res, next) => {
  const { isActive } = req.body;

  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.isActive = isActive;
  await user.save();

  res.json({
    success: true,
    data: user
  });
});

/**
 * @desc    Get pending performer applications
 * @route   GET /api/admin/performers/pending
 * @access  Private/Admin
 */
export const getPendingPerformers = asyncHandler(async (req, res, next) => {
  const performers = await Performer.findAll({
    where: { status: 'pending' },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone']
      }
    ],
    order: [['createdAt', 'ASC']]
  });

  res.json({
    success: true,
    count: performers.length,
    data: performers
  });
});

/**
 * @desc    Approve/Reject performer application
 * @route   PUT /api/admin/performers/:id/status
 * @access  Private/Admin
 */
export const updatePerformerStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body; // 'approved' or 'rejected'

  if (!['approved', 'rejected', 'suspended'].includes(status)) {
    return next(new AppError('Invalid status', 400));
  }

  const performer = await Performer.findByPk(req.params.id);

  if (!performer) {
    return next(new AppError('Performer not found', 404));
  }

  performer.status = status;
  await performer.save();

  // Emit socket event to performer
  const io = req.app.get('io');
  io.to(`user-${performer.userId}`).emit('performer-status-updated', {
    status,
    performerId: performer.id
  });

  res.json({
    success: true,
    data: performer
  });
});

/**
 * @desc    Get pending reviews
 * @route   GET /api/admin/reviews/pending
 * @access  Private/Admin
 */
export const getPendingReviews = asyncHandler(async (req, res, next) => {
  const reviews = await Review.findAll({
    where: { status: 'pending' },
    include: [
      {
        model: User,
        as: 'reviewer',
        attributes: ['firstName', 'lastName', 'email']
      },
      {
        model: Performer,
        as: 'performer',
        attributes: ['stageName']
      }
    ],
    order: [['createdAt', 'ASC']]
  });

  res.json({
    success: true,
    count: reviews.length,
    data: reviews
  });
});

/**
 * @desc    Moderate review
 * @route   PUT /api/admin/reviews/:id/moderate
 * @access  Private/Admin
 */
export const moderateReview = asyncHandler(async (req, res, next) => {
  const { status, moderatorNotes } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return next(new AppError('Invalid status', 400));
  }

  const review = await Review.findByPk(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  review.status = status;
  if (moderatorNotes) {
    review.moderatorNotes = moderatorNotes;
  }
  await review.save();

  res.json({
    success: true,
    data: review
  });
});

/**
 * @desc    Get all bookings (admin view)
 * @route   GET /api/admin/bookings
 * @access  Private/Admin
 */
export const getAllBookings = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 20, status } = req.query;
  const offset = (page - 1) * limit;

  const where = {};
  if (status) where.status = status;

  const { count, rows: bookings } = await Booking.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: 'client',
        attributes: ['firstName', 'lastName', 'email']
      },
      {
        model: Performer,
        as: 'performer',
        attributes: ['stageName']
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  res.json({
    success: true,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    data: bookings
  });
});
