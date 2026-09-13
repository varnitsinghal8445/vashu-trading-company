import express from 'express';
import { getEvents, createEvent } from '../controllers/eventController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getEvents).post(protect, admin, createEvent);

export default router;
