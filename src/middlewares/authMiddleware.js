const jwt = require("jsonwebtoken");

const UnauthorizedError = require("../errors/UnauthorizedError");

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Read token from cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Fallback to Bearer token
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;

      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      throw new UnauthorizedError("Authentication token is required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

module.exports = authMiddleware;
