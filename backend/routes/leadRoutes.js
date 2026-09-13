import express from 'express';
import { getLeads, createLead, updateLead } from '../controllers/leadController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getLeads).post(createLead);
router.route('/:id').put(protect, admin, updateLead);

export default router;
