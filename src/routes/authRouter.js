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

/**
 * @swagger
 * /api/auth/verify-email:
 *   post:
 *     summary: Verify user email
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
 *               - verificationCode
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               verificationCode:
 *                 type: string
 *                 example: "123456"
 *
 *     responses:
 *       200:
 *         description: Account verified successfully
 *       400:
 *         description: Invalid, expired, or already used verification code
 *       404:
 *         description: User not found
 */

// Verify user account
router.post(
  "/verify-email",
  validator(verifyEmailSchema),
  checkUserExists,
  verifyEmail,
);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Generate password reset code
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
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *
 *     responses:
 *       200:
 *         description: Password reset code generated successfully
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many authentication attempts
 */

// Request password reset code
router.post(
  "/forgot-password",
  authLimiter,
  validator(forgotPasswordSchema),
  checkUserExists,
  forgotPassword,
);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
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
 *               - forgotPasswordCode
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               forgotPasswordCode:
 *                 type: string
 *                 example: "123456"
 *               newPassword:
 *                 type: string
 *                 example: NewPassword123
 *
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid or expired password reset code
 *       404:
 *         description: User not found
 *       429:
 *         description: Too many authentication attempts
 */

// Reset user password
router.post(
  "/reset-password",
  authLimiter,
  validator(resetPasswordSchema),
  checkUserExists,
  resetPassword,
);

/**
 * @swagger
 * /api/auth/resend-verification-code:
 *   post:
 *     summary: Resend email verification code
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
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *
 *     responses:
 *       200:
 *         description: Verification code resent successfully
 *       400:
 *         description: User is already verified
 *       404:
 *         description: User not found
 */

// Resend verification code
router.post(
  "/resend-verification-code",
  validator(resendVerificationCodeSchema),
  checkUserExists,
  resendVerificationCode,
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags:
 *       - Authentication
 *
 *     responses:
 *       200:
 *         description: Logout successful
 */

// Logout
router.post("/logout", logout);

module.exports = router;
