import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    relatedModel: {
      type: String,
      required: true,
      enum: ['Booking', 'Order', 'Album'],
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'relatedModel',
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    remainingAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'Razorpay',
    },
    transactionId: {
      type: String, // from Razorpay
    },
    paymentDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Pending', 'Partially Paid', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate remaining amount
paymentSchema.pre('save', function (next) {
  this.remainingAmount = this.totalAmount - this.paidAmount;
  
  if (this.remainingAmount <= 0) {
    this.status = 'Paid';
  } else if (this.paidAmount > 0) {
    this.status = 'Partially Paid';
  }
  
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
