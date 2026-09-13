import asyncHandler from 'express-async-handler';
import crypto from 'crypto';
import Payment from '../models/paymentModel.js';

// @desc    Create Razorpay Order (Mock)
// @route   POST /api/payments/create-order
// @access  Private
const createRazorpayOrder = asyncHandler(async (req, res) => {
  const { relatedModel, relatedId, totalAmount } = req.body;

  // Real integration would call razorpay.orders.create() here
  // Mocking the response for test architecture
  const mockRazorpayOrderId = `order_${Math.random().toString(36).substring(2, 10)}`;

  const payment = await Payment.create({
    customerId: req.user._id,
    relatedModel,
    relatedId,
    totalAmount,
    remainingAmount: totalAmount,
    transactionId: mockRazorpayOrderId
  });

  res.status(201).json({
    id: mockRazorpayOrderId,
    currency: 'INR',
    amount: totalAmount * 100, // Razorpay expects paise
    paymentDbId: payment._id,
  });
});

// @desc    Verify Razorpay Payment Signature
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentDbId } = req.body;

  // Real integration would verify crypto signature:
  // const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
  //                               .update(razorpay_order_id + '|' + razorpay_payment_id)
  //                               .digest('hex');

  // Mock verification (assuming success in test mode)
  const isVerified = true;

  if (isVerified) {
    const payment = await Payment.findById(paymentDbId);
    
    if (payment) {
      payment.paidAmount = payment.totalAmount; // Assuming full payment for order
      payment.status = 'Paid';
      payment.paymentDate = Date.now();
      payment.transactionId = razorpay_payment_id;
      
      await payment.save();

      // We would also update the related Order or Booking status here
      // const Order = require('../models/orderModel.js');
      // await Order.findByIdAndUpdate(payment.relatedId, { status: 'Confirmed' });

      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(404);
      throw new Error('Payment record not found');
    }
  } else {
    res.status(400);
    throw new Error('Invalid signature');
  }
});

// @desc    Get user payment history
// @route   GET /api/payments/myhistory
// @access  Private
const getMyPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({ customerId: req.user._id }).sort({ createdAt: -1 });
  res.json(payments);
});

export { createRazorpayOrder, verifyPayment, getMyPayments };
