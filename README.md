# Node Auth API

Authentication and posts management API built with Node.js, Express, and MySQL.

This project was created to practice backend development concepts such as authentication, authorization, validation, layered architecture, database relationships, API security, documentation, and automated testing.


## Features

- User registration
- User login with JWT authentication
- Password hashing with bcrypt
- Email verification system
- Resend verification code
- Forgot password flow
- Password reset flow
- Protected routes
- Post ownership authorization
- CRUD operations for posts
- Request validation with Joi
- Centralized error handling
- Custom error classes
- Rate limiting with express-rate-limit
- Swagger/OpenAPI documentation
- Integration testing with Jest and Supertest
- Layered backend architecture
- MySQL relational database
- Environment variables support


## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL

### Authentication & Security
- JWT
- bcryptjs
- Helmet
- express-rate-limit
- cookie-parser

### Validation & Documentation
- Joi
- Swagger UI
- swagger-jsdoc

### Testing
- Jest
- Supertest


## Architecture

```txt
node-auth-api/
├── server.js
├── package.json
├── README.md
├── .gitignore
├── jest.config.js
├── package-lock.json
├── .env
└── src/
    ├── app.js
    │
    ├── config/
    │   ├── db.js
    │   ├── env.js
    │   └── mailer.js
    │
    ├── controllers/
    │   ├── authController.js
    │   ├── postController.js
    │   └── userController.js
    │
    ├── database/
    │   ├── schema.sql
    │   ├── models/
    │   └── workbench/
    │
    ├── docs/
    │   └── swagger.js
    │
    ├── errors/
    │   ├── AppError.js
    │   ├── BadRequestError.js
    │   ├── ConflictError.js 
    │   ├── ForbiddenError.js 
    │   ├── NotFoundError.js 
    │   └── UnauthorizedError.js
    │
    ├── middlewares/
    │   ├── authMiddleware.js
    │   ├── checkPostOwnership.js
    │   ├── checkUserExists.js
    │   ├── errorHandler.js
    │   ├── rateLimiter.js
    │   └── validator.js
    │
    ├── models/
    │   ├── postModel.js
    │   └── userModel.js
    │
    ├── routes/
    │   ├── authRouter.js
    │   ├── postRouter.js
    │   └── userRouter.js
    │
    ├── services/
    │   ├── emailService.js
    │   ├── postService.js
    │   └── userService.js
    │
    ├── tests/
    │   ├── setup.js
    │   └── integration/
    │       ├── auth.test.js
    │       └── posts.test.js
    │
    ├── utils/
    │   ├── code.js
    │   ├── cookieOptions.js
    │   ├── hash.js
    │   └── token.js
    │
    └── validators/
        ├── authValidator.js
        └── postValidator.js
```

# Authentication Flow

## Register

User creates an account using email and password.

Verify Email

A verification code is generated and sent by email.

## Login

After verification, the user can log in and receive a JWT token.

Protected Routes

Protected endpoints require a valid Bearer token.

Password Reset

Users can request a password reset code and update their password securely.

# API Endpoints

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/verify-email` | Verify user email |
| POST | `/api/auth/forgot-password` | Generate password reset code |
| POST | `/api/auth/reset-password` | Reset user password |
| POST | `/api/auth/resend-verification-code` | Resend verification code |
| POST | `/api/auth/logout` | Logout user |

## Posts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get post by ID |
| GET | `/api/posts/me` | Get authenticated user's posts |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update own post |
| DELETE | `/api/posts/:id` | Delete own post |

# Swagger Documentation

After starting the server, access:

```txt
http://localhost:8000/api/docs
```

Swagger includes:
- endpoint documentation
- request schemas
- response schemas
- JWT authorization
- protected route testing

# Environment Variables

Create a `.env` file in the root directory:

```
PORT=8000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=node_auth_api

JWT_SECRET=your_secret_key

EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_password
EMAIL_FROM=your_email
```

# Installation

Clone the repository:
`git clone https://github.com/NicolauAlfredo/node-auth-api.git`

Enter the project folder:
`cd node-auth-api`

Install dependencies:
`npm install`

# Running the Server
Development mode: `npm run dev`

Production mode: `npm start`

# Database Setup
Import the MySQL schema: `mysql -u root -p < src/database/schema.sql`

# Running Tests
Run integration tests: `npm test`

Current test coverage includes:
- authentication routes
- protected routes
- posts endpoints
- API integration flow

Security Features
- JWT authentication
- Password hashing
- Route protection
- Ownership authorization
- Request validation
- Rate limiting
- HTTP security headers
- Centralized error handling

# Learning Goals

This project was built to practice:

- REST API development
- Backend architecture
- Authentication systems
- Authorization rules
- Database relationships
- API security
- Middleware patterns
- Service layer architecture
- Automated testing
- API documentation

# Future Improvements
- Refresh tokens
- Docker support
- CI/CD pipeline
- Pagination and filtering
- File uploads
- Role-based authorization
- Email templates
- Deployment to cloud platforms

# Author
Nicolau Alfredo

GitHub:
https://github.com/NicolauAlfredo
