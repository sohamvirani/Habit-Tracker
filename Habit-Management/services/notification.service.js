const Habit = require('../models/Habit');

exports.sendReminders = async () => {
  try {
    // Retrieve today's date range
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    // Find habits that haven't been completed today
    const incompleteHabits = await Habit.find({
      lastCompleted: { $lt: startOfDay },
    });

    // Send reminders for each habit
    incompleteHabits.forEach(habit => {
      console.log(`Reminder: It's time to work on your habit - ${habit.name}`);
    });
  } catch (err) {
    console.error('Failed to send reminders:', err);
  }
};
