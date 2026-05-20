const errorHandler = (errer, req, res, next) => {
  console.error(errer);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.isOperational ? err.message : "Internal Server Error",
  });
};

module.exports = errorHandler;
