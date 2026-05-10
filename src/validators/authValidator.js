const Joi = require("joi");

// Register validation schema
const registerSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(60)
    .required()
    .email({ tlds: { allow: ["com", "net"] } }),

  password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?.*d)-{8,}$")),
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

  newPassword: Joi.string().min(6).max(50).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
