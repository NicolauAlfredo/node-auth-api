const { findUserByEmail } = require("../models/userModel");

// Check if user exists by email
const checkUserExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkUserExists;
