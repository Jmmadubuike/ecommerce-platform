// Middleware to check if the user is an admin
exports.adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized. Please log in.' }); // User is not logged in
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' }); // User is not an admin
  }

  next(); // Proceed to the next middleware or route handler
};
