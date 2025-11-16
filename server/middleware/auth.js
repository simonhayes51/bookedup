import jwt from 'jsonwebtoken';
import { AppError, asyncHandler } from './errorHandler.js';
import { User, Performer } from '../models/index.js';

/**
 * Protect routes - Verify JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    if (!user.isActive) {
      return next(new AppError('Your account has been deactivated', 401));
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized to access this route', 401));
  }
});

/**
 * Restrict to specific roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

/**
 * Optional auth - doesn't fail if no token, just doesn't set req.user
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (user && user.isActive) {
      req.user = user;
    }
  } catch (error) {
    // Silently fail - it's optional
  }

  next();
});

/**
 * Ensure user is a performer
 */
export const ensurePerformer = asyncHandler(async (req, res, next) => {
  if (req.user.role !== 'performer') {
    return next(new AppError('This action is only available to performers', 403));
  }

  // Get performer profile
  const performer = await Performer.findOne({ where: { userId: req.user.id } });

  if (!performer) {
    return next(new AppError('Performer profile not found', 404));
  }

  req.performer = performer;
  next();
});
