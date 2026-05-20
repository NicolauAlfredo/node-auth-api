const app = require("./src/app");

const { connectDB } = require("./src/config/db");

// Define application port
const PORT = process.env.PORT || 8000;

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
