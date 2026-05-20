const { findPostById } = require("../models/postModel");

// Check if authenticated user owns the post
const checkPostOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to modify this post",
      });
    }

    res.post = post;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkPostOwnership;
