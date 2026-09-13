import mongoose from 'mongoose';

const galleryPhotoSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: 'Uncategorized',
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    publicId: {
      type: String,
    },
  },
  { timestamps: true }
);

const gallerySchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    galleryId: {
      type: String,
      required: true,
      unique: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isIndexable: {
      type: Boolean,
      default: false, // Prevents SEO indexing by default for privacy
    },
    expiresAt: {
      type: Date,
    },
    photos: [galleryPhotoSchema],
    categories: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// We store the user's photo selections separately so they can modify it until submission
const photoSelectionSchema = new mongoose.Schema(
  {
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Gallery',
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    selectedPhotoIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    status: {
      type: String,
      enum: ['Pending', 'Submitted'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const Gallery = mongoose.model('Gallery', gallerySchema);
const PhotoSelection = mongoose.model('PhotoSelection', photoSelectionSchema);

export { Gallery, PhotoSelection };
