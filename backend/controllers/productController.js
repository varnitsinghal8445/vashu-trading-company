import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    category: 'Print',
    description: 'Sample description',
    basePrice: 0,
    images: ['/images/sample.jpg'],
    options: {
      sizes: ['8x10'],
      materials: [],
      coverTypes: [],
      paperTypes: [],
    }
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

export { getProducts, getProductById, createProduct };
