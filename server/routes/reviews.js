import express from 'express';
import {
  createReview,
  getPerformerReviews,
  getReview,
  updateReview,
  deleteReview,
  respondToReview
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/performer/:id', getPerformerReviews);
router.get('/:id', getReview);

router.use(protect); // All routes below require authentication

router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.post('/:id/respond', respondToReview);

export default router;
