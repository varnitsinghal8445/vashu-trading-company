import asyncHandler from 'express-async-handler';
import { Gallery, PhotoSelection } from '../models/galleryModel.js';
import bcrypt from 'bcryptjs';

// @desc    Create a new gallery (Admin)
// @route   POST /api/galleries
// @access  Private/Admin
const createGallery = asyncHandler(async (req, res) => {
  const { customerId, eventName, password, categories, expiresAt } = req.body;

  // Hash the password for the gallery
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Generate unique gallery ID e.g. MH-GAL-8273
  const galleryId = `MH-GAL-${Math.floor(1000 + Math.random() * 9000)}`;

  const gallery = await Gallery.create({
    customerId,
    galleryId,
    eventName,
    password: hashedPassword,
    categories: categories || ['Uncategorized'],
    expiresAt,
  });

  // Create initial empty photo selection for this customer
  await PhotoSelection.create({
    galleryId: gallery._id,
    customerId,
  });

  res.status(201).json(gallery);
});

// @desc    Get gallery details (Customer/Admin)
// @route   GET /api/galleries/:id
// @access  Private
const getGalleryById = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    // Only Admin or the owning customer can access
    if (req.user.role !== 'Admin' && gallery.customerId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this gallery');
    }

    if (!gallery.isActive) {
      res.status(400);
      throw new Error('This gallery is no longer active');
    }

    res.json(gallery);
  } else {
    res.status(404);
    throw new Error('Gallery not found');
  }
});

// @desc    Add photos to gallery (Admin)
// @route   POST /api/galleries/:id/photos
// @access  Private/Admin
const addPhotosToGallery = asyncHandler(async (req, res) => {
  const { photos } = req.body; // Array of { url, category, isVideo }

  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    gallery.photos.push(...photos);
    await gallery.save();
    res.status(201).json(gallery);
  } else {
    res.status(404);
    throw new Error('Gallery not found');
  }
});

// @desc    Update photo selection (Customer)
// @route   POST /api/galleries/:id/select
// @access  Private
const updatePhotoSelection = asyncHandler(async (req, res) => {
  const { selectedPhotoIds, submitFinal } = req.body;

  const gallery = await Gallery.findById(req.params.id);

  if (!gallery || gallery.customerId.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const selection = await PhotoSelection.findOne({ galleryId: req.params.id });

  if (selection) {
    if (selection.status === 'Submitted') {
      res.status(400);
      throw new Error('Selection has already been submitted');
    }
    selection.selectedPhotoIds = selectedPhotoIds;
    if (submitFinal) {
      selection.status = 'Submitted';
    }
    await selection.save();
    res.json(selection);
  } else {
    res.status(404);
    throw new Error('Selection record not found');
  }
});

export { createGallery, getGalleryById, addPhotosToGallery, updatePhotoSelection };
