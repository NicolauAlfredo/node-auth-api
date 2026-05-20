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

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Understanding JWT Authentication
 *
 *               description:
 *                 type: string
 *                 example: This post explains how JWT authentication works in Node.js APIs.
 *
 *     responses:
 *       201:
 *         description: Post created successfully
 *
 *       401:
 *         description: Unauthorized
 */

// Create post - protected
router.post(
  "/",
  authMiddleware,
  validator(createPostSchema),
  createPostController,
);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *
 *     responses:
 *       200:
 *         description: List of posts
 */

// Get all posts - public
router.get("/", getAllPostsController);

/**
 * @swagger
 * /api/posts/me:
 *   get:
 *     summary: Get authenticated user's posts
 *     tags:
 *       - Posts
 *
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Authenticated user's posts retrieved successfully
 *
 *       401:
 *         description: Unauthorized
 */

// Get authenticated user's posts - protected
router.get("/me", authMiddleware, getMyPostsController);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags:
 *       - Posts
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *
 *       404:
 *         description: Post not found
 */

// Get post by id - public
router.get("/:id", getPostByIdController);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update authenticated user's post
 *     tags:
 *       - Posts
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated post title
 *
 *               description:
 *                 type: string
 *                 example: This post description was updated through the API.
 *
 *     responses:
 *       200:
 *         description: Post updated successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Post not found
 */

// Update post - protected
router.put(
  "/:id",
  authMiddleware,
  checkPostOwnership,
  validator(updatePostSchema),
  updatePostController,
);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete authenticated user's post
 *     tags:
 *       - Posts
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       403:
 *         description: Forbidden
 *
 *       404:
 *         description: Post not found
 */

// Delete post - protected
router.delete("/:id", authMiddleware, checkPostOwnership, deletePostController);

module.exports = router;
