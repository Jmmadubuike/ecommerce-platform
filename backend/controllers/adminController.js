const Product = require('../models/Product');
const Order = require('../models/Order');
const { body, validationResult } = require('express-validator');

// Create a product
exports.createProduct = [
    // Validate input
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isNumeric().withMessage('Stock must be a number'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price, description, category, stock } = req.body;

        try {
            const product = new Product({
                name,
                price,
                description,
                category,
                stock
            });

            await product.save();
            res.status(201).json(product);
        } catch (err) {
            console.error(err); // Log the error for debugging
            res.status(500).json({ message: 'Failed to create product' });
        }
    }
];

// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled']; // Define valid statuses

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided' });
    }

    try {
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Failed to update order status' });
    }
};
