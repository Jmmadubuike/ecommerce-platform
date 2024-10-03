const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

        const order = new Order({
            user: userId,
            items: cart.items,
            shippingAddress,
            paymentMethod,
            totalPrice: cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
        });

        await order.save();
        await Cart.findOneAndDelete({ user: userId }); // Clear cart after order

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
