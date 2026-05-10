const { pool } = require("../config/db");

// Create a new post
const createPost = async ({ title, description, userId }) => {
  const [result] = await pool.query(
    `
    INSERT INTO posts (
      title,
      description,
      user_id
    )
    VALUES (?, ?, ?)
    `,
    [title, description, userId],
  );

  return result.insertId;
};

// Find all posts
const findAllPosts = async () => {
  const [rows] = await pool.query(
    `
    SELECT 
      posts.id,
      posts.title,
      posts.description,
      posts.user_id AS userId,
      users.email AS userEmail,
      posts.created_at,
      posts.updated_at
    FROM posts
    INNER JOIN users
      ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
    `,
  );

  return rows;
};

// Find post by id
const findPostById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT 
      posts.id,
      posts.title,
      posts.description,
      posts.user_id AS userId,
      users.email AS userEmail,
      posts.created_at,
      posts.updated_at
    FROM posts
    INNER JOIN users
      ON posts.user_id = users.id
    WHERE posts.id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Find posts by user id
const findPostsByUserId = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT 
      id,
      title,
      description,
      user_id AS userId,
      created_at,
      updated_at
    FROM posts
    WHERE user_id = ?
    ORDER BY created_at DESC
    `,
    [userId],
  );

  return rows;
};

// Update post
const updatePost = async ({ id, title, description }) => {
  const [result] = await pool.query(
    `
    UPDATE posts
    SET
      title = ?,
      description = ?
    WHERE id = ?
    `,
    [title, description, id],
  );

  return result.affectedRows;
};

// Delete post
const deletePost = async (id) => {
  const [result] = await pool.query(
    `
    DELETE FROM posts
    WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  findPostsByUserId,
  updatePost,
  deletePost,
};
