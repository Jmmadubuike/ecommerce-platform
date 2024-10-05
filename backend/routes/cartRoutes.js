const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart } = require('../controllers/cartController');
const authenticateUser = require('../middlewares/authMiddleware'); // Import your authentication middleware

// POST route to add an item to the cart
router.post('/add', authenticateUser, addToCart); // Add authentication middleware

// POST route to remove an item from the cart
router.post('/remove/:id', authenticateUser, removeFromCart); // Add authentication middleware

module.exports = router;
