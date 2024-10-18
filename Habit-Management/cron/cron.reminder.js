const cron = require('node-cron');
const { sendReminders } = require('../services/notification.service');

// Function to schedule daily reminders
const initializeReminderScheduler = () => {
  cron.schedule('0 8 * * *', async () => {
    console.log('Executing scheduled reminders');
    await sendReminders();
  });
};

module.exports = { initializeReminderScheduler };
