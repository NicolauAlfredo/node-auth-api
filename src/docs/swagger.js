const { version } = require("joi");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "node Auth API",
      version: "1.0.0",
      description:
        "Authentication API built with Node.js, Express, MySQL, JWT, cookies, and protected routes.",
    },

    servers: [
      {
        url: "http://localhost:8000",
        description: "Local development server",
      },
    ],

    security: [
      {
        bearerAuth: [],
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },

        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
