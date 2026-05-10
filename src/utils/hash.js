const bcrypt = require("bcryptjs");

// Hash plain text password
const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// Compare plain text password with hashed password
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
