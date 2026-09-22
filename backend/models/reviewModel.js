import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  partnerName: {
    type: String,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  eventType: {
    type: String,
    required: [true, 'Event type is required'],
    enum: [
      'Wedding',
      'Pre-Wedding',
      'Haldi',
      'Mehndi',
      'Birthday',
      'Family Event',
      'Other'
    ],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must not be more than 5'],
  },
  story: {
    type: String,
    required: [true, 'Story/Review text is required'],
    trim: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
