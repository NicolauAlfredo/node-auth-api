// Generate 6-digit numeric code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate expiration date in minutes
const generateExpirationDate = (minutes = 10) => {
  return new Date(Date.now() + minutes * 60 * 1000);
};

module.exports = {
  generateCode,
  generateExpirationDate,
};
