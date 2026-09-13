import express from 'express';
import {
  createAlbum,
  getAlbumById,
  uploadAlbumPreview,
  addAlbumRevision,
} from '../controllers/albumController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, admin, createAlbum);
router.route('/:id').get(protect, getAlbumById);
router.route('/:id/preview').post(protect, uploadAlbumPreview); // Need designer role check later, inside controller for now
router.route('/:id/revision').post(protect, addAlbumRevision);

export default router;
