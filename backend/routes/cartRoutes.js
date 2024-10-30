const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart } = require('../controllers/cartController');
const authenticateUser = require('../middlewares/authMiddleware');

// POST route to add an item to the cart
router.post('/add', authenticateUser, addToCart);

// POST route to remove an item from the cart
router.post('/remove/:id', authenticateUser, removeFromCart);

module.exports = router;
