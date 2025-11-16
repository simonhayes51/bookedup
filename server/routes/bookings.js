import express from 'express';
import {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All booking routes require authentication

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .get(getBooking)
  .delete(deleteBooking);

router.put('/:id/status', updateBookingStatus);

export default router;
