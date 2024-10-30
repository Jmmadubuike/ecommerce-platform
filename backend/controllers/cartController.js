const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  // Check if productId and quantity are provided
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }

  // Validate quantity
  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be greater than zero" });
  }

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if the item is already in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    // Update quantity if the item is already in the cart
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    // Find the cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === req.params.id
    );

    if (itemIndex > -1) {
      // Remove the item from the cart
      cart.items.splice(itemIndex, 1);
      // If the cart is empty, i may choose to delete it
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
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
