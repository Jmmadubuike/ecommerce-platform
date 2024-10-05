const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress, paymentMethod } = req.body;

  // Validate shipping address and payment method
  if (!shippingAddress || !paymentMethod) {
    return res
      .status(400)
      .json({ message: "Shipping address and payment method are required." });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const items = [];
    let totalPrice = 0;

    // Validate each item in the cart
    for (const item of cart.items) {
      if (!mongoose.isValidObjectId(item.product)) {
        return res
          .status(400)
          .json({ message: `Invalid product ID: ${item.product}` });
      }

      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });
      }

      const price = product.price || 0; // Fallback to 0 if price is undefined

      items.push({
        product: item.product,
        quantity: item.quantity,
        price, // Ensure price is retrieved correctly
      });

      totalPrice += price * item.quantity; // Calculate total price
    }

    // Create the order
    const order = new Order({
      user: userId,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice: totalPrice || 0, // Ensure totalPrice is not NaN
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
exports.createOrder = createOrder;

exports.getOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ user: userId }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
