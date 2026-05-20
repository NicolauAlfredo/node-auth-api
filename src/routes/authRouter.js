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

// Docs
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *
 *               password:
 *                 type: string
 *                 example: Password123
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 *       409:
 *         description: Email already registered
 */

// Register a new user
router.post("/register", validator(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *
 *               password:
 *                 type: string
 *                 example: Password123
 *
 *     responses:
 *       200:
 *         description: Login successful
 *
 *       401:
 *         description: Invalid credentials
 */

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
