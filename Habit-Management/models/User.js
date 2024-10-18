const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define user schema
const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  preferences: {
    reminderTime: {
      type: String,
      default: '08:00 AM',
    },
    allowNotifications: {
      type: Boolean,
      default: true,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
