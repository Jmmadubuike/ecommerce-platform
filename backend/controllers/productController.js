const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new product (Admin only)
exports.createProduct = async (req, res) => {
  const { name, price, description, category, stock, imageUrl } = req.body;

  // Simple validation
  if (!name || !price || !description || !category || !stock || !imageUrl) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const newProduct = new Product({ name, price, description, category, stock, imageUrl });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing product (Admin only)
exports.updateProduct = async (req, res) => {
  const { name, price, description, category, stock, imageUrl } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, stock, imageUrl },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product (Admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
};
