const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

        const items = cart.items.map(item => ({
            product: item.product,
            quantity: item.quantity,
            price: item.product.price, // Make sure to get the price from the product
        }));

        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = new Order({
            user: userId,
            items,
            shippingAddress,
            paymentMethod,
            totalPrice,
        });

        await order.save();
        await Cart.findOneAndDelete({ user: userId }); // Clear cart after order

        res.status(201).json(order);
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: err.message });
    }
};

// Export the functions
exports.createOrder = createOrder; // Ensure this line is included
exports.getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.find({ user: userId }).populate('items.product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
