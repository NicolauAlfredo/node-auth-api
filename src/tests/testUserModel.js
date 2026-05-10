const {
  createUser,
  findUserByEmail,
  findUserById,
} = require("../models/userModel");

const testUserModel = async () => {
  try {
    const userId = await createUser({
      email: "test@example.com",
      password: "hashed_password_example",
      verificationCode: "123456",
      verificationCodeExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log("User created with ID:", userId);

    const userByEmail = await findUserByEmail("test@example.com");
    console.log("User found by email:", userByEmail);

    const userById = await findUserById(userId);
    console.log("User found by ID:", userById);

    process.exit(0);
  } catch (error) {
    console.error("Test failed:", error.message);
    process.exit(1);
  }
};

testUserModel();
