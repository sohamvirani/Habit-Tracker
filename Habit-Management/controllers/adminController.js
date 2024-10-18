const User = require('../models/User');
const Habit = require('../models/Habit');

// Function to fetch all users without passwords
exports.getAllUsers = async (req, res) => {
  try {
    const userList = await User.find().select('-password');
    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve user data' });
  }
};

// Function to create a new habit template
exports.createHabitTemplate = async (req, res) => {
  const { name, frequency } = req.body;

  try {
    const habitTemplate = new Habit({ name, frequency, isTemplate: true });
    await habitTemplate.save();
    res.status(201).json(habitTemplate);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create the habit template' });
  }
};
