const AppError = require("../errors/AppError");

const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new AppError("Validation failed", 400);
    }

    next();
  };
};

module.exports = validator;
