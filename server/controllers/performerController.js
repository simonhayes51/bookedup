import { Op } from 'sequelize';
import { Performer, User, Review, Favorite } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all performers
 * @route   GET /api/performers
 * @access  Public
 */
export const getPerformers = asyncHandler(async (req, res, next) => {
  const {
    genre,
    location,
    search,
    minPrice,
    maxPrice,
    verified,
    premium,
    sort,
    page = 1,
    limit = 12
  } = req.query;

  const where = { status: 'approved' };
  const offset = (page - 1) * limit;

  // Filters
  if (genre) where.genre = genre;
  if (location) where.location = { [Op.iLike]: `%${location}%` };
  if (verified === 'true') where.verified = true;
  if (premium === 'true') where.premium = true;

  if (minPrice || maxPrice) {
    where.priceMin = {};
    if (minPrice) where.priceMin[Op.gte] = minPrice;
    if (maxPrice) where.priceMin[Op.lte] = maxPrice;
  }

  if (search) {
    where[Op.or] = [
      { stageName: { [Op.iLike]: `%${search}%` } },
      { bio: { [Op.iLike]: `%${search}%` } }
    ];
  }

  // Sorting
  let order = [['createdAt', 'DESC']];
  if (sort === 'rating') order = [['rating', 'DESC']];
  if (sort === 'price-low') order = [['priceMin', 'ASC']];
  if (sort === 'price-high') order = [['priceMin', 'DESC']];
  if (sort === 'popular') order = [['totalBookings', 'DESC']];

  const { count, rows: performers } = await Performer.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'avatar', 'isVerified']
      }
    ],
    order,
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  res.json({
    success: true,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    data: performers
  });
});

/**
 * @desc    Get single performer
 * @route   GET /api/performers/:id
 * @access  Public
 */
export const getPerformer = asyncHandler(async (req, res, next) => {
  const performer = await Performer.findByPk(req.params.id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'avatar', 'email', 'phone']
      },
      {
        model: Review,
        as: 'reviews',
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'reviewer',
            attributes: ['firstName', 'lastName', 'avatar']
          }
        ]
      }
    ]
  });

  if (!performer) {
    return next(new AppError('Performer not found', 404));
  }

  // Increment view count
  performer.totalViews += 1;
  await performer.save();

  res.json({
    success: true,
    data: performer
  });
});

/**
 * @desc    Create performer profile
 * @route   POST /api/performers
 * @access  Private
 */
export const createPerformer = asyncHandler(async (req, res, next) => {
  // Check if user already has a performer profile
  const existingPerformer = await Performer.findOne({
    where: { userId: req.user.id }
  });

  if (existingPerformer) {
    return next(new AppError('You already have a performer profile', 400));
  }

  const performerData = {
    userId: req.user.id,
    ...req.body
  };

  const performer = await Performer.create(performerData);

  // Update user role
  await User.update(
    { role: 'performer' },
    { where: { id: req.user.id } }
  );

  res.status(201).json({
    success: true,
    data: performer
  });
});

/**
 * @desc    Update performer profile
 * @route   PUT /api/performers/:id
 * @access  Private
 */
export const updatePerformer = asyncHandler(async (req, res, next) => {
  let performer = await Performer.findByPk(req.params.id);

  if (!performer) {
    return next(new AppError('Performer not found', 404));
  }

  // Make sure user owns this performer profile
  if (performer.userId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to update this profile', 403));
  }

  performer = await performer.update(req.body);

  res.json({
    success: true,
    data: performer
  });
});

/**
 * @desc    Delete performer profile
 * @route   DELETE /api/performers/:id
 * @access  Private
 */
export const deletePerformer = asyncHandler(async (req, res, next) => {
  const performer = await Performer.findByPk(req.params.id);

  if (!performer) {
    return next(new AppError('Performer not found', 404));
  }

  if (performer.userId !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError('Not authorized to delete this profile', 403));
  }

  await performer.destroy();

  res.json({
    success: true,
    data: {}
  });
});

/**
 * @desc    Toggle favorite performer
 * @route   POST /api/performers/:id/favorite
 * @access  Private
 */
export const toggleFavorite = asyncHandler(async (req, res, next) => {
  const performer = await Performer.findByPk(req.params.id);

  if (!performer) {
    return next(new AppError('Performer not found', 404));
  }

  const existing = await Favorite.findOne({
    where: {
      userId: req.user.id,
      performerId: req.params.id
    }
  });

  if (existing) {
    await existing.destroy();
    performer.totalLikes -= 1;
    await performer.save();

    return res.json({
      success: true,
      favorited: false
    });
  }

  await Favorite.create({
    userId: req.user.id,
    performerId: req.params.id
  });

  performer.totalLikes += 1;
  await performer.save();

  res.json({
    success: true,
    favorited: true
  });
});

/**
 * @desc    Get user's favorite performers
 * @route   GET /api/performers/favorites/me
 * @access  Private
 */
export const getMyFavorites = asyncHandler(async (req, res, next) => {
  const favorites = await Favorite.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Performer,
        as: 'performer',
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'avatar']
          }
        ]
      }
    ]
  });

  res.json({
    success: true,
    count: favorites.length,
    data: favorites.map(f => f.performer)
  });
});
