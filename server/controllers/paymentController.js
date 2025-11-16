import Stripe from 'stripe';
import { Booking, Performer, User } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Create payment intent
 * @route   POST /api/payments/create-intent
 * @access  Private
 */
export const createPaymentIntent = asyncHandler(async (req, res, next) => {
  const { bookingId } = req.body;

  const booking = await Booking.findByPk(bookingId, {
    include: [
      {
        model: Performer,
        as: 'performer',
        include: [{ model: User, as: 'user' }]
      }
    ]
  });

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  if (booking.clientId !== req.user.id) {
    return next(new AppError('Not authorized', 403));
  }

  if (booking.status !== 'accepted') {
    return next(new AppError('Booking must be accepted before payment', 400));
  }

  if (booking.paymentStatus === 'paid') {
    return next(new AppError('This booking has already been paid', 400));
  }

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(parseFloat(booking.totalAmount) * 100), // Convert to cents
    currency: 'gbp',
    metadata: {
      bookingId: booking.id,
      clientId: req.user.id,
      performerId: booking.performerId
    },
    description: `Booking ${booking.performer.stageName} for ${booking.eventType || 'event'}`
  });

  // Save payment intent ID
  booking.paymentIntentId = paymentIntent.id;
  await booking.save();

  res.json({
    success: true,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id
  });
});

/**
 * @desc    Confirm payment
 * @route   POST /api/payments/confirm
 * @access  Private
 */
export const confirmPayment = asyncHandler(async (req, res, next) => {
  const { paymentIntentId } = req.body;

  const booking = await Booking.findOne({
    where: { paymentIntentId }
  });

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status === 'succeeded') {
    booking.paymentStatus = 'paid';
    await booking.save();

    res.json({
      success: true,
      message: 'Payment confirmed',
      data: booking
    });
  } else {
    res.json({
      success: false,
      message: 'Payment not completed',
      status: paymentIntent.status
    });
  }
});

/**
 * @desc    Stripe webhook
 * @route   POST /api/payments/webhook
 * @access  Public
 */
export const stripeWebhook = asyncHandler(async (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const booking = await Booking.findOne({
        where: { paymentIntentId: paymentIntent.id }
      });

      if (booking) {
        booking.paymentStatus = 'paid';
        await booking.save();

        // Emit socket event
        const io = req.app.get('io');
        io.to(`user-${booking.clientId}`).emit('payment-success', { bookingId: booking.id });
      }
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      const failedBooking = await Booking.findOne({
        where: { paymentIntentId: failedPayment.id }
      });

      if (failedBooking) {
        failedBooking.paymentStatus = 'failed';
        await failedBooking.save();
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

/**
 * @desc    Request refund
 * @route   POST /api/payments/refund
 * @access  Private
 */
export const requestRefund = asyncHandler(async (req, res, next) => {
  const { bookingId, reason } = req.body;

  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  if (booking.clientId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized', 403));
  }

  if (booking.paymentStatus !== 'paid') {
    return next(new AppError('This booking has not been paid', 400));
  }

  if (!booking.paymentIntentId) {
    return next(new AppError('Payment intent not found', 400));
  }

  // Create refund
  const refund = await stripe.refunds.create({
    payment_intent: booking.paymentIntentId,
    reason: reason || 'requested_by_customer'
  });

  if (refund.status === 'succeeded') {
    booking.paymentStatus = 'refunded';
    booking.status = 'cancelled';
    booking.cancellationReason = reason;
    booking.cancelledBy = req.user.id;
    booking.cancelledAt = new Date();
    await booking.save();

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: booking
    });
  } else {
    return next(new AppError('Refund failed', 500));
  }
});

/**
 * @desc    Get payment history
 * @route   GET /api/payments/history
 * @access  Private
 */
export const getPaymentHistory = asyncHandler(async (req, res, next) => {
  const bookings = await Booking.findAll({
    where: {
      clientId: req.user.id,
      paymentStatus: ['paid', 'refunded']
    },
    include: [
      {
        model: Performer,
        as: 'performer',
        include: [{ model: User, as: 'user' }]
      }
    ],
    order: [['createdAt', 'DESC']]
  });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});
