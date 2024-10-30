const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const UserController = require("../controllers/userController");

// Register new user
router.post("/register", UserController.register);

// Login user
router.post("/login", UserController.login);

// Get user info (protected route)
router.get("/profile", authMiddleware, UserController.getUserInfo);

module.exports = router;
