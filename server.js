const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./src/config/db");
const authRouter = require("./src/routes/authRouter");
const postRouter = require("./src/routes/postRouter");

const app = express();

// Define application port
const PORT = process.env.PORT || 8000;

// Enable CORS for frontend communication
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Add security HTTP headers
app.use(helmet());

// Parse cookies from incoming requests
app.use(cookieParser());

// Parse incoming JSON payloads
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Authentication routes
app.use("/api/auth", authRouter);

// Post routes
app.use("/api/posts", postRouter);

// Base route to test server status
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// Start application after database connection
const startServer = async () => {
  try {
    // Connect to MySQL database
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    console.error(error.message);
  }
};

startServer();
