const {
  createPost,
  findAllPosts,
  findPostById,
  findPostsByUserId,
  updatePost,
  deletePost,
} = require("../models/postModel");

const NotFoundError = require("../errors/NotFoundError");

const createPostService = async ({ title, description, userId }) => {
  const postId = await createPost({ title, description, userId });

  return { postId };
};

const getAllPostsService = async () => {
  return findAllPosts();
};

const getPostByIdService = async (id) => {
  const post = await findPostById(id);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  return post;
};

const getPostsByUserIdService = async (userId) => {
  return findPostsByUserId(userId);
};

const updatePostService = async ({ id, title, description }) => {
  await updatePost({ id, title, description });
};

const deletePostService = async (id) => {
  await deletePost(id);
};

module.exports = {
  createPostService,
  getAllPostsService,
  getPostByIdService,
  getPostsByUserIdService,
  updatePostService,
  deletePostService,
};
