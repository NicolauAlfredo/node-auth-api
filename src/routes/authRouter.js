const express = require("express");

const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login user
router.post("/login", login);

// Verify user account
router.post("/verify-email", verifyEmail);

// Request password reset code
router.post("/forgot-password", forgotPassword);

// Reset user password
router.post("/reset-password", resetPassword);

module.exports = router;