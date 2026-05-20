const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  getMyPostsControler,
  updatePostController,
  deletePostController,
} = require("../controllers/postController");

const router = express.Router();

// Create post - protected
router.post("/", authMiddleware, createPostController);

// Get all posts - public
router.get("/", getAllPostsController);

// Get authenticated user's posts - protected
router.get("/me", authMiddleware, getMyPostsControler);

// Get post by id - public
router.get("/:id", getPostByIdController);

// Update post - protected
router.put("/:id", authMiddleware, updatePostController);

// Delete post - protected
router.delete("/:id", authMiddleware, deletePostController);

module.exports = router;
