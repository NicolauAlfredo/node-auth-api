use node_auth_api;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,

  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,

  verified BOOLEAN NOT NULL DEFAULT FALSE,

  verification_code VARCHAR(10),
  verification_code_expires_at DATETIME,

  forgot_password_code VARCHAR(10),
  forgot_password_code_expires_at DATETIME,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);