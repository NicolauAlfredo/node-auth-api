const { findUserByEmail } = require("../models/userModel");

const AppError = require("../errors/AppError");

// Check if user exists by email
const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkUserExists;
