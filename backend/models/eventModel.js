import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // e.g. "Rahul & Priya Wedding"
    },
    eventType: {
      type: String,
      required: true,
      enum: ['Wedding', 'Engagement', 'Reception', 'Pre-Wedding', 'Other'],
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photographerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References a User with 'Photographer' role
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References a User with 'Staff' role
    },
    location: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Scheduled', 'In Progress', 'Completed', 'Cancelled'],
      default: 'Scheduled',
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
