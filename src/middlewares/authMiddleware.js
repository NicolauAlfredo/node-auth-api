const jwt = require("jsonwebtoken");
const { findUserById } = require("../models/userModel");

const UnauthorizedError = require("../errors/UnauthorizedError");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("Authentication token is required");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.id);

    if (!user) {
      throw new UnauthorizedError("Invalid authentication token");
    }

    req.user = user;

    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

module.exports = authMiddleware;
