const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Define the routes
router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);

module.exports = router;
