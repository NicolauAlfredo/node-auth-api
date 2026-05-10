const Joi = require("joi");

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Register validation schema
const registerSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
  }),
});

// Login validation schema
const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().required(),
});

// Verify email validation schema
const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),

  verificationCode: Joi.string().length(6).required(),
});

// Forgot password validation schema
const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Reset password validation schema
const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),

  forgotPasswordCode: Joi.string().length(6).required(),

  newPassword: Joi.string().pattern(passwordPattern).required().messages({
    "string.pattern.base":
      "New password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
  }),
});

// Resend verification code validation schema
const resendVerificationCodeSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationCodeSchema,
};
