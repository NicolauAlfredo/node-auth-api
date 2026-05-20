const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Create post - protected
router.post("/", authMiddleware);

// Get all posts - public
router.get("/");

// Get authenticated user's posts - protected
router.get("/me", authMiddleware);

// Get post by id - public
router.get("/:id");

// Update post - protected
router.put("/:id", authMiddleware);

// Delete post - protected
router.delete("/:id", authMiddleware);

module.exports = router;
