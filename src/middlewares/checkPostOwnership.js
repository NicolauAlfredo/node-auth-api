const { findPostById } = require("../models/postModel");

const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

// Check if authenticated user owns the post
const checkPostOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await findPostById(id);

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    if (post.userId !== userId) {
      throw new ForbiddenError("You are not allowed to modify this post");
    }

    res.post = post;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkPostOwnership;
