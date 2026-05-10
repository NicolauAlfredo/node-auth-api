const jwt = require("jsonwebtoken");

// Generate authentication token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  generateToken,
};