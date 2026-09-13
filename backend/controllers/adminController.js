import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
import Lead from '../models/leadModel.js';
import Event from '../models/eventModel.js';
import Payment from '../models/paymentModel.js';
import Album from '../models/albumModel.js';
import { Gallery } from '../models/galleryModel.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
  const newLeads = await Lead.countDocuments({ status: 'New' });
  const confirmedEvents = await Event.countDocuments({ status: 'Scheduled' });
  const pendingPayments = await Payment.countDocuments({ status: { $in: ['Pending', 'Partially Paid'] } });
  const albumsInDesign = await Album.countDocuments({ status: 'Designing' });
  const ordersCount = await Order.countDocuments({ status: { $in: ['Processing', 'Printing'] } });

  res.json({
    newLeads,
    confirmedEvents,
    pendingPayments,
    albumsInDesign,
    ordersCount,
  });
});

// @desc    Get aggregated customer profile
// @route   GET /api/admin/customers/:id
// @access  Private/Admin
const getCustomerProfile = asyncHandler(async (req, res) => {
  const customerId = req.params.id;

  const user = await User.findById(customerId).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('Customer not found');
  }

  const events = await Event.find({ customerId });
  const orders = await Order.find({ customerId });
  const payments = await Payment.find({ customerId });
  const albums = await Album.find({ customerId });
  const galleries = await Gallery.find({ customerId });

  res.json({
    user,
    events,
    orders,
    payments,
    albums,
    galleries,
  });
});

export { getAdminStats, getCustomerProfile };
