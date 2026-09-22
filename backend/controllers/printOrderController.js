import PrintOrder from '../models/printOrderModel.js';

// @desc    Create a new print order (Public)
// @route   POST /api/print-orders
// @access  Public
export const createPrintOrder = async (req, res) => {
  try {
    const {
      customerDetails,
      deliveryMethod,
      photos,
      totals
    } = req.body;

    // Generate a unique Order ID (e.g., #PS-2026-12345)
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `#PS-${year}-${randomDigits}`;

    const order = await PrintOrder.create({
      orderId,
      customerDetails,
      deliveryMethod,
      photos,
      totals,
      status: 'NEW'
    });

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all print orders for admin (Admin only)
// @route   GET /api/print-orders
// @access  Private
export const getAllPrintOrders = async (req, res) => {
  try {
    const orders = await PrintOrder.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single print order by ID
// @route   GET /api/print-orders/:id
// @access  Private
export const getPrintOrderById = async (req, res) => {
  try {
    const order = await PrintOrder.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status
// @route   PATCH /api/print-orders/:id/status
// @access  Private
export const updatePrintOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['NEW', 'CONFIRMED', 'PRINTING', 'READY', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status provided'
      });
    }

    const order = await PrintOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
