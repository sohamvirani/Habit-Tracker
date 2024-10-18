const Habit = require('../models/Habit');

// Retrieve all habits for the logged-in user
exports.getHabits = async (req, res) => {
  try {
    const userHabits = await Habit.find({ user: req.user.id });
    res.status(200).json(userHabits);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve habits' });
  }
};

// Add a new habit
exports.createHabit = async (req, res) => {
  const { name, frequency } = req.body;

  try {
    const newHabit = new Habit({ user: req.user.id, name, frequency });
    await newHabit.save();
    
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create a new habit' });
  }
};

// Modify an existing habit
exports.updateHabit = async (req, res) => {
  const { name, frequency } = req.body;

  try {
    const habitToUpdate = await Habit.findById(req.params.id);

    if (!habitToUpdate || habitToUpdate.user.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found or unauthorized' });
    }

    habitToUpdate.name = name || habitToUpdate.name;
    habitToUpdate.frequency = frequency || habitToUpdate.frequency;

    await habitToUpdate.save();
    res.status(200).json(habitToUpdate);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update habit' });
  }
};

// Remove a habit
exports.deleteHabit = async (req, res) => {
  try {
    const habitToDelete = await Habit.findById(req.params.id);

    if (!habitToDelete || habitToDelete.user.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found or unauthorized' });
    }

    await habitToDelete.remove();
    res.status(200).json({ message: 'Habit successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete the habit' });
  }
};

// Get a habit by its ID
exports.getHabitById = async (req, res) => {
  try {
    const habitDetails = await Habit.findById(req.params.id);

    if (!habitDetails || habitDetails.user.toString() !== req.user.id) {
      return res.status(404).json({ error: 'Habit not found or unauthorized' });
    }

    res.status(200).json(habitDetails);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving habit details' });
  }
};
