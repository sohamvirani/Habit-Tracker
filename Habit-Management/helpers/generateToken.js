const jwt = require('jsonwebtoken');

// Function to generate JWT token for a user
const createToken = (user) => {
  return jwt.sign(
    { userId: user._id, userRole: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h', // Token expiry time set to 1 day
    }
  );
};

module.exports = createToken;
