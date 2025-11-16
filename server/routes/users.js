import express from 'express';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// User routes can be expanded as needed
// Currently user management is handled through auth routes

export default router;
