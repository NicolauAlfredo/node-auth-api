const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const { getUserProfileController } = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get authenticated user profile
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Authenticated user retrieved successfully
 *
 *       401:
 *         description: Unauthorized
 */

// Get authenticated user profile
router.get("/me", authMiddleware, getUserProfileController);

module.exports = router;
