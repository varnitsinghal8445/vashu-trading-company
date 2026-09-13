import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    event: {
      type: String, // Wedding, Pre-Wedding, etc.
    },
    date: {
      type: Date,
    },
    location: {
      type: String,
    },
    budget: {
      type: String,
    },
    source: {
      type: String,
      enum: ['Website', 'WhatsApp', 'Instagram', 'Google', 'Referral', 'Walk-in'],
      default: 'Website',
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Interested', 'Negotiation', 'Converted', 'Lost'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
