const { findUserById } = require("../models/userModel");
const NotFoundError = require("../errors/NotFoundError");  

const getUserProfileService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new NotFoundError("user not found");
  }

  return user;
};

module.exports = {
  getUserProfileService,
};
