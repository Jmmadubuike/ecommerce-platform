const mongoose = require("mongoose");

// Define product schema
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0, // Default stock is 0
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields

module.exports = mongoose.model("Product", ProductSchema); // Export the Product model
