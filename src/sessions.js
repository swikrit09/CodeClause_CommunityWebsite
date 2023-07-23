const crypto = require('crypto');

// Function to generate a random string of specified length
const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // Convert to hexadecimal format
    .slice(0, length); // Return required number of characters
};

// Generate a random secret key of 32 characters (adjust the length as needed)
const secretKey = generateRandomString(32);

console.log('Generated secret key:', secretKey);

module.exports = secretKey;