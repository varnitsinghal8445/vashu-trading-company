import mongoose from 'mongoose';

const albumRevisionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Requested', 'Addressed'],
      default: 'Requested',
    },
  },
  { timestamps: true }
);

const albumSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    eventName: {
      type: String,
      required: true,
    },
    albumType: {
      type: String,
      required: true, // e.g., 'Premium', 'Photobook'
    },
    size: {
      type: String,
      required: true, // e.g., '12x36', '12x24'
    },
    pages: {
      type: Number,
      required: true,
    },
    sheets: {
      type: Number,
      required: true,
    },
    coverType: {
      type: String,
      required: true,
    },
    selectedPhotos: [
      {
        type: String, // URLs of photos selected by customer
      },
    ],
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    previewUrl: {
      type: String, // PDF or Flipbook link uploaded by designer
    },
    revisions: [albumRevisionSchema],
    status: {
      type: String,
      enum: [
        'Selection Pending',
        'Selection Complete',
        'Designing',
        'Design Uploaded',
        'Customer Review',
        'Changes Requested',
        'Approved',
        'Printing',
        'Printed',
        'Delivered',
      ],
      default: 'Selection Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model('Album', albumSchema);

export default Album;
