const { findUserByEmail } = require("../models/userModel");

const NotFoundError = require("../errors/NotFoundError");

// Check if user exists by email
const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkUserExists;
