import express from 'express';
import {
  getStats,
  getAllUsers,
  updateUserStatus,
  getPendingPerformers,
  updatePerformerStatus,
  getPendingReviews,
  moderateReview,
  getAllBookings
} from '../controllers/adminController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(restrictTo('admin'));

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.put('/users/:id/status', updateUserStatus);
router.get('/performers/pending', getPendingPerformers);
router.put('/performers/:id/status', updatePerformerStatus);
router.get('/reviews/pending', getPendingReviews);
router.put('/reviews/:id/moderate', moderateReview);
router.get('/bookings', getAllBookings);

export default router;
