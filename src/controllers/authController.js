const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  createUser,
  findUserByEmail,
  verifyUser,
  saveForgotPasswordCode,
  updatePassword,
} = require("../models/userModel");

// Generate 6-digit verification code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = generateCode();

    const verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const userId = await createUser({
      email,
      password: hashedPassword,
      verificationCode,
      verificationCodeExpiresAt,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        userId,
        email,
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
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

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

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

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
    const { email, verificationCode } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const forgotPasswordCode = generateCode();

    const forgotPasswordCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await saveForgotPasswordCode({
      email,
      forgotPasswordCode,
      forgotPasswordCodeExpiresAt,
    });

    res.status(200).json({
      success: true,
      message: "Password reset code generated successfully",
      forgotPasswordCode, // temporary: later this should be sent by email
    });
  } catch (error) {
    next(error);
  }
};

// Reset user password
const resetPassword = async (req, res, next) => {
  try {
    const { email, forgotPasswordCode, newPassword } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    const hashedPassword = await bcrypt.hash(newPassword, 10);

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

module.exports = {
  register,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
};