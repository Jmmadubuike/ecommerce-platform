// Middleware to check if the user is an admin
exports.adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Proceed to the next middleware or route handler
  };
  