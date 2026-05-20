const BadRequestError = require("../errors/BadRequestError");

const validator = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        throw new BadRequestError(
          error.details.map((detail) => detail.message).join(", "),
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validator;
