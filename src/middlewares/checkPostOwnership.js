const { findPostById } = require("../models/postModel");

const AppError = require("../errors/AppError");

// Check if authenticated user owns the post
const checkPostOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await findPostById(id);

    if (!post) {
      throw new AppError("Post not found", 404);
    }

    if (post.userId !== userId) {
      throw new AppError("You are not allowed to modify this post", 403);
    }

    res.post = post;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkPostOwnership;
