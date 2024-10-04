// cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than zero" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.params.id
    );
    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      if (cart.items.length === 0) {
        await cart.remove(); // Optionally delete the cart if empty
        return res.status(200).json({ message: "Cart is empty now" });
      }
      await cart.save();
      res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
