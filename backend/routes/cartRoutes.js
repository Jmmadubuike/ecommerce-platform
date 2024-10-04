const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart } = require('../controllers/cartController');

// POST route to add an item to the cart
router.post('/add', addToCart);

// POST route to remove an item from the cart
router.post('/remove/:id', removeFromCart);

module.exports = router;
