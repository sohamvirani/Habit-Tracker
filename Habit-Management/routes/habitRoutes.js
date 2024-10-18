const express = require('express');
const habitController = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes for habits
router.get('/', protect, habitController.getHabits);
router.post('/', protect, habitController.createHabit);

router.get('/:id', protect, habitController.getHabitById);
router.put('/:id', protect, habitController.updateHabit);
router.delete('/:id', protect, habitController.deleteHabit);

module.exports = router;
