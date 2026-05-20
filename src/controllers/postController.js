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
      throw new AppError("Post not found", 404);
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
const getMyPostsController = async (req, res, next) => {
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
  getMyPostsController,
  updatePostController,
  deletePostController,
};
