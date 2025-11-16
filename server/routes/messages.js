import express from 'express';
import {
  getConversations,
  getOrCreateConversation,
  getMessages,
  sendMessage,
  markAsRead,
  deleteMessage
} from '../controllers/messageController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All message routes require authentication

router.get('/conversations', getConversations);
router.post('/conversations', getOrCreateConversation);
router.get('/conversations/:id', getMessages);
router.put('/conversations/:id/read', markAsRead);
router.post('/', sendMessage);
router.delete('/:id', deleteMessage);

export default router;
