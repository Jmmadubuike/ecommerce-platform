const jwt = require("jsonwebtoken");

// Middleware to check if the user is an admin
exports.adminMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token
  //console.log("Token received:", token); // Log the token for debugging

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" }); // User is not logged in
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    //console.log("User decoded:", req.user); // Log user information
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error); // Log the error
    res.status(401).json({ message: "Token is not valid" });
  }
};
