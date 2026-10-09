import mongoose from 'mongoose';

const printPhotoSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true, // e.g., '4x6', '8x12', 'Custom'
  },
  customWidth: {
    type: Number,
  },
  customHeight: {
    type: Number,
  },
  paper: {
    type: String,
    required: true, // e.g., 'Glossy', 'Matte', 'HD Glossy', 'Professional'
  },
  finish: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  orientation: {
    type: String, // 'Portrait', 'Landscape', 'Square'
  },
  price: {
    type: Number,
    default: 0,
  }
});

const printOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  customerDetails: {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    email: { type: String },
    city: { type: String, required: true },
    address: { type: String },
    specialInstructions: { type: String },
    driveLink: { type: String },
  },
  deliveryMethod: {
    type: String,
    enum: ['Home Delivery', 'Studio Pickup'],
    required: true,
  },
  photos: [printPhotoSchema],
  totals: {
    totalPhotos: { type: Number, required: true, default: 0 },
    totalPrints: { type: Number, required: true, default: 0 },
    estimatedPrice: { type: Number, required: true, default: 0 },
  },
  status: {
    type: String,
    enum: ['NEW', 'CONFIRMED', 'PRINTING', 'READY', 'COMPLETED', 'CANCELLED'],
    default: 'NEW',
  }
}, {
  timestamps: true,
});

const PrintOrder = mongoose.model('PrintOrder', printOrderSchema);

export default PrintOrder;
