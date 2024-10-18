const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define habit schema
const habitSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    default: '',
  },
  categories: {
    type: [String],
  },
  schedule: {
    type: String,
    enum: ['daily', 'weekly'],
    default: 'daily',
  },
  streakCount: {
    type: Number,
    default: 0,
  },
  progressThisWeek: {
    type: [Boolean],
    default: [false, false, false, false, false, false, false],
  },
  reminderAt: {
    type: Date,
  },
  completedToday: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
