const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const { getUserProfileController } = require("../controllers/userController");

const router = express.Router();

// Get authenticated user profile
router.get("/me", authMiddleware, getUserProfileController);

module.exports = router;
