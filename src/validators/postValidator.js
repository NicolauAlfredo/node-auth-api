const Joi = require("joi");

// Create post validation schema
const createPostSchema = Joi.object({
  title: Joi.string().trim().min(3).max(255).required(),

  descrition: Joi.string().trim().min(10).required(),
});

// Update post validation schema
const updatePostSchema = Joi.object({
  title: Joi.string().trim().min(3).max(255).required(),

  descrition: Joi.string().trim().min(10).required(),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
};
