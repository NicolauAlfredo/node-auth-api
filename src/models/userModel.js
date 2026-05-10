const { pool } = require("../config/db");

// Create a new user
const createUser = async ({
  email,
  password,
  verificationCode,
  verificationCodeExpiresAt,
}) => {
  const [result] = await pool.query(
    `
    INSERT INTO users (
      email,
      password,
      verification_code,
      verification_code_expires_at
    )
    VALUES (?, ?, ?, ?)
    `,
    [email, password, verificationCode, verificationCodeExpiresAt],
  );

  return result.insertId;
};

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email],
  );

  return rows[0];
};

// Find user by id
const findUserById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT id, email, verified, created_at, updated_at
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id],
  );

  return rows[0];
};

// Mark user account as verified
const verifyUser = async (id) => {
  const [result] = await pool.query(
    `
    UPDATE users
    SET 
      verified = TRUE,
      verification_code = NULL,
      verification_code_expires_at = NULL
    WHERE id = ?
    `,
    [id],
  );

  return result.affectedRows;
};

// Save forgot password code
const saveForgotPasswordCode = async ({
  email,
  forgotPasswordCode,
  forgotPasswordCodeExpiresAt,
}) => {
  const [result] = await pool.query(
    `
    UPDATE users
    SET
      forgot_password_code = ?,
      forgot_password_code_expires_at = ?
    WHERE email = ?
    `,
    [forgotPasswordCode, forgotPasswordCodeExpiresAt, email],
  );

  return result.affectedRows;
};

// Update user password
const updatePassword = async ({ email, password }) => {
  const [result] = await pool.query(
    `
    UPDATE users
    SET
      password = ?,
      forgot_password_code = NULL,
      forgot_password_code_expires_at = NULL
    WHERE email = ?
    `,
    [password, email],
  );

  return result.affectedRows;
};

// Update user verification code
const updateVerificationCode = async ({
  email,
  verificationCode,
  verificationCodeExpiresAt,
}) => {
  const [result] = await pool.query(
    `
    UPDATE users
    SET
      verification_code = ?,
      verification_code_expires_at = ?
    WHERE email = ?
    `,
    [verificationCode, verificationCodeExpiresAt, email],
  );

  return result.affectedRows;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  verifyUser,
  saveForgotPasswordCode,
  updatePassword,
  updateVerificationCode,
};
