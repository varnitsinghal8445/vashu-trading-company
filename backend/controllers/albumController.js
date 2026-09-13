import asyncHandler from 'express-async-handler';
import Album from '../models/albumModel.js';

// @desc    Create new album project (Admin)
// @route   POST /api/albums
// @access  Private/Admin
const createAlbum = asyncHandler(async (req, res) => {
  const { customerId, eventName, albumType, size, pages, sheets, coverType, designerId, selectedPhotos } = req.body;

  const album = await Album.create({
    customerId,
    eventName,
    albumType,
    size,
    pages,
    sheets,
    coverType,
    designerId,
    selectedPhotos,
    status: 'Selection Complete',
  });

  res.status(201).json(album);
});

// @desc    Get album details
// @route   GET /api/albums/:id
// @access  Private
const getAlbumById = asyncHandler(async (req, res) => {
  const album = await Album.findById(req.params.id)
    .populate('customerId', 'name email')
    .populate('designerId', 'name');

  if (album) {
    if (req.user.role === 'Customer' && album.customerId._id.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to view this album');
    }
    res.json(album);
  } else {
    res.status(404);
    throw new Error('Album not found');
  }
});

// @desc    Upload design preview (Designer/Admin)
// @route   POST /api/albums/:id/preview
// @access  Private
const uploadAlbumPreview = asyncHandler(async (req, res) => {
  const { previewUrl } = req.body;

  const album = await Album.findById(req.params.id);

  if (album) {
    if (req.user.role === 'Designer' && album.designerId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this album');
    }

    album.previewUrl = previewUrl;
    album.status = 'Customer Review';
    await album.save();

    res.json(album);
  } else {
    res.status(404);
    throw new Error('Album not found');
  }
});

// @desc    Add revision request or approve (Customer)
// @route   POST /api/albums/:id/revision
// @access  Private/Customer
const addAlbumRevision = asyncHandler(async (req, res) => {
  const { comment, isApproved } = req.body;

  const album = await Album.findById(req.params.id);

  if (album) {
    if (album.customerId.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized');
    }

    if (isApproved) {
      album.status = 'Approved';
    } else {
      album.status = 'Changes Requested';
      album.revisions.push({
        customerId: req.user._id,
        comment,
      });
    }

    await album.save();
    res.json(album);
  } else {
    res.status(404);
    throw new Error('Album not found');
  }
});

export { createAlbum, getAlbumById, uploadAlbumPreview, addAlbumRevision };
