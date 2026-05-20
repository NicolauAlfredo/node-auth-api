const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const validator = require("../middlewares/validator");
const checkPostOwnership = require("../middlewares/checkPostOwnership");

const {
  createPostSchema,
  updatePostSchema,
} = require("../validators/postValidator");

const {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  getMyPostsController,
  updatePostController,
  deletePostController,
} = require("../controllers/postController");

const router = express.Router();

// Create post - protected
router.post(
  "/",
  authMiddleware,
  validator(createPostSchema),
  createPostController,
);

// Get all posts - public
router.get("/", getAllPostsController);

// Get authenticated user's posts - protected
router.get("/me", authMiddleware, getMyPostsController);

// Get post by id - public
router.get("/:id", getPostByIdController);

// Update post - protected
router.put(
  "/:id",
  authMiddleware,
  checkPostOwnership,
  validator(updatePostSchema),
  updatePostController,
);

// Delete post - protected
router.delete("/:id", authMiddleware, checkPostOwnership, deletePostController);

module.exports = router;
