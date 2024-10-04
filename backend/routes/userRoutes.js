const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const UserController = require("../controllers/UserController"); // Ensure the path is correct

// Register new user
router.post("/register", UserController.register);

// Login user
router.post("/login", UserController.login);

// Get user info (protected route)
router.get("/me", authMiddleware, UserController.getUserInfo); // Ensure this points to a valid function

module.exports = router;
