const express = require("express");

const validator = require("../middlewares/validator");
const checkUserExists = require("../middlewares/checkUserExists");
const { authLimiter } = require("../middlewares/rateLimiter");

const {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationCodeSchema,
} = require("../validators/authValidator");

const {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerificationCode,
  logout,
} = require("../controllers/authController");

const router = express.Router();

// Register a new user
router.post("/register", validator(registerSchema), register);

// Login user
router.post(
  "/login",
  authLimiter,
  validator(loginSchema),
  checkUserExists,
  login,
);

// Verify user account
router.post(
  "/verify-email",
  validator(verifyEmailSchema),
  checkUserExists,
  verifyEmail,
);

// Request password reset code
router.post(
  "/forgot-password",
  authLimiter,
  validator(forgotPasswordSchema),
  checkUserExists,
  forgotPassword,
);

// Reset user password
router.post(
  "/reset-password",
  authLimiter,
  validator(resetPasswordSchema),
  checkUserExists,
  resetPassword,
);

// Resend verification code
router.post(
  "/resend-verification-code",
  validator(resendVerificationCodeSchema),
  checkUserExists,
  resendVerificationCode,
);

// Logout
router.post("/logout", logout);

module.exports = router;
