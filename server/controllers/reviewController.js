import { Review, Booking, Performer, User } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';
import sequelize from '../config/database.js';

/**
 * @desc    Create review
 * @route   POST /api/reviews
 * @access  Private
 */
export const createReview = asyncHandler(async (req, res, next) => {
  const { bookingId, rating, comment, professionalism, quality, value, communication, wouldRecommend } = req.body;

  // Get booking
  const booking = await Booking.findByPk(bookingId);

  if (!booking) {
    return next(new AppError('Booking not found', 404));
  }

  // Check authorization
  if (booking.clientId !== req.user.id) {
    return next(new AppError('Only the client can review this booking', 403));
  }

  // Check booking status
  if (booking.status !== 'completed') {
    return next(new AppError('You can only review completed bookings', 400));
  }

  // Check if review already exists
  const existingReview = await Review.findOne({ where: { bookingId } });
  if (existingReview) {
    return next(new AppError('You have already reviewed this booking', 400));
  }

  // Create review
  const review = await Review.create({
    bookingId,
    reviewerId: req.user.id,
    performerId: booking.performerId,
    rating,
    comment,
    professionalism,
    quality,
    value,
    communication,
    wouldRecommend
  });

  // Update performer rating
  await updatePerformerRating(booking.performerId);

  res.status(201).json({
    success: true,
    data: review
  });
});

/**
 * @desc    Get reviews for a performer
 * @route   GET /api/reviews/performer/:id
 * @access  Public
 */
export const getPerformerReviews = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const { count, rows: reviews } = await Review.findAndCountAll({
    where: {
      performerId: req.params.id,
      status: 'approved'
    },
    include: [
      {
        model: User,
        as: 'reviewer',
        attributes: ['firstName', 'lastName', 'avatar']
      },
      {
        model: Booking,
        as: 'booking',
        attributes: ['eventDate', 'eventType']
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
    data: reviews
  });
});

/**
 * @desc    Get single review
 * @route   GET /api/reviews/:id
 * @access  Public
 */
export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'reviewer',
        attributes: ['firstName', 'lastName', 'avatar']
      },
      {
        model: Performer,
        as: 'performer',
        attributes: ['stageName']
      }
    ]
  });

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  res.json({
    success: true,
    data: review
  });
});

/**
 * @desc    Update review
 * @route   PUT /api/reviews/:id
 * @access  Private
 */
export const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findByPk(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  // Check authorization
  if (review.reviewerId !== req.user.id) {
    return next(new AppError('Not authorized to update this review', 403));
  }

  review = await review.update(req.body);

  // Update performer rating
  await updatePerformerRating(review.performerId);

  res.json({
    success: true,
    data: review
  });
});

/**
 * @desc    Delete review
 * @route   DELETE /api/reviews/:id
 * @access  Private
 */
export const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findByPk(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  if (review.reviewerId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this review', 403));
  }

  const performerId = review.performerId;
  await review.destroy();

  // Update performer rating
  await updatePerformerRating(performerId);

  res.json({
    success: true,
    data: {}
  });
});

/**
 * @desc    Respond to review (performer)
 * @route   POST /api/reviews/:id/respond
 * @access  Private
 */
export const respondToReview = asyncHandler(async (req, res, next) => {
  const { response } = req.body;

  const review = await Review.findByPk(req.params.id);

  if (!review) {
    return next(new AppError('Review not found', 404));
  }

  // Check if user is the performer
  const performer = await Performer.findOne({
    where: {
      id: review.performerId,
      userId: req.user.id
    }
  });

  if (!performer) {
    return next(new AppError('Only the performer can respond to this review', 403));
  }

  review.response = response;
  review.respondedAt = new Date();
  await review.save();

  res.json({
    success: true,
    data: review
  });
});

/**
 * Helper function to update performer rating
 */
async function updatePerformerRating(performerId) {
  const reviews = await Review.findAll({
    where: {
      performerId,
      status: 'approved'
    }
  });

  if (reviews.length === 0) {
    await Performer.update(
      { rating: 0, totalReviews: 0 },
      { where: { id: performerId } }
    );
    return;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating = (totalRating / reviews.length).toFixed(2);

  await Performer.update(
    { rating: avgRating, totalReviews: reviews.length },
    { where: { id: performerId } }
  );
}
