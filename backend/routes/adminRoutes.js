import express from 'express';
import { getAdminStats, getCustomerProfile } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/stats').get(protect, admin, getAdminStats);
router.route('/customers/:id').get(protect, admin, getCustomerProfile);

export default router;
