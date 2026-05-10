const transporter = require("../config/mailer");

// Send verification code email
const sendVerificationCodeEmail = async ({ to, code }) => {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your email address",
    html: `
      <h1>Email verification</h1>
      <p>Your verification code is:</p>
      <h2>${code}</h2>
      <p>This code will expire in 10 minutes.</p>
    `,
  });
};

module.exports = {
  sendVerificationCodeEmail,
};
