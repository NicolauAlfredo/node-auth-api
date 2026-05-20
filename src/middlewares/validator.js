const BadRequestError = require("../errors/BadRequestError");

const validator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      throw new BadRequestError("Validation failed");
    }

    next();
  };
};

module.exports = validator;
