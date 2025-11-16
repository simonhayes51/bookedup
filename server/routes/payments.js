import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  stripeWebhook,
  requestRefund,
  getPaymentHistory
} from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Webhook route (no auth, raw body needed)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Protected routes
router.use(protect);

router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.post('/refund', requestRefund);
router.get('/history', getPaymentHistory);

export default router;
