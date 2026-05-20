const {
  createPost,
  findAllPosts,
  findPostById,
  findPostsByUserId,
  updatePost,
  deletePost,
} = require("../models/postModel");

// Create a new post
const createPostController = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;

    const postId = await createPost({
      title,
      description,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: {
        postId,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all posts
const getAllPostsController = async (req, res, next) => {
  try {
    const posts = await findAllPosts();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// Get post by id
const getPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// Get authenticated user's posts
const getMyPostsControler = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const posts = await findPostsByUserId(userId);

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// Update post
const updatePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
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
        message: "You are not allowed to update this post",
      });
    }

    await updatePost({
      id,
      title,
      description,
    });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Delete post
const deletePostController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "post not fond",
      });
    }

    if (post.userId != userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this post",
      });
    }

    await deletePost(id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getPostByIdController,
  getMyPostsControler,
  updatePostController,
  deletePostController,
};
