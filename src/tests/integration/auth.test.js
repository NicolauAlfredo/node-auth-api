const request = require("supertest");
const app = require("../../app");

describe("Auth Routes", () => {
  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          email: `test${Date.now()}@example.com`,
          password: "Password123",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
    });
  });
});
