const { pool } = require("../config/db");

beforeAll(async () => {
  console.log("Starting tests...");
});

afterAll(async () => {
  await pool.end();
  console.log("Tests finished");
});
