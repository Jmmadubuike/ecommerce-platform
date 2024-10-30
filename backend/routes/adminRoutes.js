const express = require('express');
const { createProduct, updateOrderStatus } = require('../controllers/adminController');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

const router = express.Router();

// Route to create a product (Admin only)
router.post('/products', adminMiddleware, createProduct);

// Route to update order status (Admin only)
router.patch('/orders/status', adminMiddleware, updateOrderStatus);

module.exports = router;
