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
const { sendVerificationCodeEmail } = require("../services/emailService");

// Register new user
const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
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
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your account before logging in",
      });
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
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }

    if (user.verification_code !== verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    if (new Date() > new Date(user.verification_code_expires_at)) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired",
      });
    }

    await verifyUser(user.id);

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
      return res.status(400).json({
        success: false,
        message: "Invalid password reset code",
      });
    }

    if (new Date() > new Date(user.forgot_password_code_expires_at)) {
      return res.status(400).json({
        success: false,
        message: "Password reset code has expired",
      });
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
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
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
