const express = require('express');
const { getAllUsers, createHabitTemplate } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch all users
router.route('/users')
  .get(protect, admin, getAllUsers);

// Route to create a new habit template
router.route('/templates')
  .post(protect, admin, createHabitTemplate);

module.exports = router;
