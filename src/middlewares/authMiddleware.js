const jwt = require("jsonwebtoken");
const { findUserById } = require("../models/userModel");

const AppError = require("../errors/AppError");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Authentication token is required", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.id);

    if (!user) {
      throw new AppError("Invalid authentication token", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    throw new AppError("Invalid or expired token", 401);
  }
};

module.exports = authMiddleware;
