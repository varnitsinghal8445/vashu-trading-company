import express from 'express';
import {
  createReview,
  getApprovedReviews,
  getAllReviewsAdmin,
  updateReviewStatus,
  deleteReview
} from '../controllers/reviewController.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getApprovedReviews)
  .post(createReview);

// Admin routes
router.route('/admin')
  .get(getAllReviewsAdmin);

router.route('/:id/status')
  .patch(updateReviewStatus);

router.route('/:id')
  .delete(deleteReview);

export default router;
