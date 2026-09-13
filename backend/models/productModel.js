import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g., 'Print', 'Frame', 'Photobook', 'Digital Delivery'
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String, // Cloudinary URLs
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    // Configuration options depending on category
    options: {
      sizes: [String],      // e.g., '4x6', '8x12', '12x36'
      materials: [String],  // e.g., 'Wood', 'Metal', 'Glass'
      coverTypes: [String], // e.g., 'Leather', 'Velvet', 'Acrylic'
      paperTypes: [String], // e.g., 'Luster', 'Glossy', 'Matte'
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
