import express from 'express';
import {
  getPerformers,
  getPerformer,
  createPerformer,
  updatePerformer,
  deletePerformer,
  toggleFavorite,
  getMyFavorites
} from '../controllers/performerController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', optionalAuth, getPerformers);
router.get('/favorites/me', protect, getMyFavorites);
router.get('/:id', getPerformer);
router.post('/', protect, createPerformer);
router.put('/:id', protect, updatePerformer);
router.delete('/:id', protect, deletePerformer);
router.post('/:id/favorite', protect, toggleFavorite);

export default router;
