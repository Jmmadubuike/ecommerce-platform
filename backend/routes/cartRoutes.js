const express = require('express');
const { addToCart, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to add an item to the cart
router.post('/', authMiddleware, addToCart);

// Route to remove an item from the cart
router.delete('/:id', authMiddleware, removeFromCart);

module.exports = router; // Export the routes
