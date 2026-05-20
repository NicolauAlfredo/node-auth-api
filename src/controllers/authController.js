const {
  createUser,
  findUserByEmail,
  verifyUser,
  saveForgotPasswordCode,
  updatePassword,
  updateVerificationCode,
} = require("../models/userModel");

const { hashPassword, comparePassword } = require("../utils/hash");
const { generateCode, generateExpirationDate } = require("../utils/code");
const { generateToken } = require("../utils/token");
const {
  sendVerificationCodeEmail,
  sendAccountVerifiedEmail,
} = require("../services/emailService");
const AppError = require("../errors/AppError");

// Register new user
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }

    const hashedPassword = await hashPassword(password);

    const verificationCode = generateCode();
    const verificationCodeExpiresAt = generateExpirationDate(10);

    const userId = await createUser({
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiresAt,
    });

    await sendVerificationCodeEmail({
      to: email,
      code: verificationCode,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        userId,
        email,
        // Development only: remove in production
        verificationCode,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { password } = req.body;
    const user = req.user;

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.verified) {
      throw new AppError("Please verify your account before logging in", 403);
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Verify user email
const verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.body;
    const user = req.user;

    if (user.verified) {
      throw new AppError("User already verified", 400);
    }

    if (user.verification_code !== verificationCode) {
      throw new AppError("Invalid verification code", 400);
    }

    if (new Date() > new Date(user.verification_code_expires_at)) {
      throw new AppError("Verification code has expired", 400);
    }

    await verifyUser(user.id);

    await sendAccountVerifiedEmail({
      to: user.email,
    });

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Request password reset code
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const forgotPasswordCode = generateCode();
    const forgotPasswordCodeExpiresAt = generateExpirationDate(10);

    await saveForgotPasswordCode({
      email,
      forgotPasswordCode,
      forgotPasswordCodeExpiresAt,
    });

    res.status(200).json({
      success: true,
      message: "Password reset code generated successfully",
      forgotPasswordCode,
    });
  } catch (error) {
    next(error);
  }
};

// Reset user password
const resetPassword = async (req, res, next) => {
  try {
    const { email, forgotPasswordCode, newPassword } = req.body;
    const user = req.user;

    if (user.forgot_password_code !== forgotPasswordCode) {
      throw new AppError("Invalid password reset code", 400);
    }

    if (new Date() > new Date(user.forgot_password_code_expires_at)) {
      throw new AppError("Password reset code has expired", 400);
    }

    const hashedPassword = await hashPassword(newPassword);

    await updatePassword({
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Resend verification code
const resendVerificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = req.user;

    if (user.verified) {
      throw new AppError("User is already verified", 400);
    }

    const verificationCode = generateCode();
    const verificationCodeExpiresAt = generateExpirationDate(10);

    await updateVerificationCode({
      email,
      // Development only: remove in production
      verificationCode,
      verificationCodeExpiresAt,
    });

    await sendVerificationCodeEmail({
      to: email,
      code: verificationCode,
    });

    res.status(200).json({
      success: true,
      message: "Verification code resent successfully",
      verificationCode, // temporary: later this should be sent by email
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerificationCode,
};
