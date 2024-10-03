const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to create a new order
router.post('/', authMiddleware, createOrder);

// Route to get all orders for a user
router.get('/', authMiddleware, getOrders);

module.exports = router; // Export the routes
