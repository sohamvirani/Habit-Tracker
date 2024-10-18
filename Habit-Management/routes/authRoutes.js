const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// User registration and login routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Profile management routes
router
  .route('/profile')
  .get(protect, authController.getUserProfile)
  .put(protect, authController.updateUserProfile)
  .delete(protect, authController.deleteUser);

module.exports = router;
