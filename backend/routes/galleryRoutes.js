import express from 'express';
import {
  createGallery,
  getGalleryById,
  addPhotosToGallery,
  updatePhotoSelection,
} from '../controllers/galleryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createGallery);
router.route('/:id').get(protect, getGalleryById);
router.route('/:id/photos').post(protect, admin, addPhotosToGallery);
router.route('/:id/select').post(protect, updatePhotoSelection);

export default router;
