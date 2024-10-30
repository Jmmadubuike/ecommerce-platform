const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

// Route to get all products
router.get('/', getProducts);

// Route to get a single product by ID
router.get('/:id', getProductById);

// Route to create a new product (Admin only)
router.post('/', authMiddleware, adminMiddleware, createProduct);

// Route to update a product (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);

// Route to delete a product (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;