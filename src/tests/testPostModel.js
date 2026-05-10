const {
  createPost,
  findAllPosts,
  findPostById,
  findPostsByUserId,
} = require("../models/postModel");

const testPostModel = async () => {
  try {
    // Existing test user id
    const userId = 2;

    // Create post
    const postId = await createPost({
      title: "My first post",
      description: "Testing the post model",
      userId,
    });

    console.log("Post created with ID:", postId);

    // Find post by id
    const post = await findPostById(postId);

    console.log("Post found by ID:");
    console.log(post);

    // Find posts by user id
    const userPosts = await findPostsByUserId(userId);

    console.log("Posts found by user ID:");
    console.log(userPosts);

    // Find all posts
    const allPosts = await findAllPosts();

    console.log("All posts:");
    console.log(allPosts);

    process.exit(0);
  } catch (error) {
    console.error("Test failed:");
    console.error(error.message);

    process.exit(1);
  }
};

testPostModel();
