import { sendTokenResponse } from '../utils/jwt.js';

/**
 * @desc    Google OAuth callback
 * @route   GET /api/auth/google/callback
 * @access  Public
 */
export const googleCallback = (req, res) => {
  // Update last login
  req.user.lastLogin = new Date();
  req.user.save();

  // Generate JWT and send response
  sendTokenResponse(req.user, 200, res);
};

/**
 * @desc    Facebook OAuth callback
 * @route   GET /api/auth/facebook/callback
 * @access  Public
 */
export const facebookCallback = (req, res) => {
  // Update last login
  req.user.lastLogin = new Date();
  req.user.save();

  // Generate JWT and send response
  sendTokenResponse(req.user, 200, res);
};
