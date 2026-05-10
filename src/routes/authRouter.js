const express = require("express");

const validator = require("../middlewares/validator");

const {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require("../validators/authValidator");

const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

// Register a new user
router.post("/register", validator(registerSchema), register);

// Login user
router.post("/login", validator(loginSchema), login);

// Verify user account
router.post("/verify-email", validator(verifyEmailSchema), verifyEmail);

// Request password reset code
router.post(
  "/forgot-password",
  validator(forgotPasswordSchema),
  forgotPassword,
);

// Reset user password
router.post("/reset-password", validator(resetPasswordSchema), resetPassword);

module.exports = router;
