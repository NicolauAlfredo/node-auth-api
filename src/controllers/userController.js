const { getUserProfileService } = require("../services/userService");

// Get authenticated user profile
const getUserProfileController = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await getUserProfileService(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProfileController };
