const mysql = require("mysql2/promise");
const env = require("./env");

// Create MySQL connection pool
const pool = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  // Maximum number of database connections
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL database connected successfully");

    connection.release();
  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = {
  pool,
  connectDB,
};
