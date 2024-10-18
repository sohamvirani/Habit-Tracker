const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
exports.verifyUser = async (req, res, next) => {
  let token;

  // Check if token exists and is a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify and decode token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user information to request
      req.user = await User.findById(decodedToken.id).select('-password');
      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized access' });
    }
  }

  // If no token found
  if (!token) {
    return res.status(401).json({ error: 'Token missing, access denied' });
  }
};

// Middleware to check if user has admin privileges
exports.checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
};
