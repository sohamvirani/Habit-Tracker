// Load required modules
const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./db/db');
const authenticationRoutes = require('./routes/authRoutes');
const habitManagementRoutes = require('./routes/habitRoutes');
const adminManagementRoutes = require('./routes/adminRoutes');
const { initializeReminders } = require('./cron/cron.reminder');

// Load environment variables from .env file
dotenv.config();

// Establish database connection
connectDatabase();

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Define API routes
app.use('/api/auth', authenticationRoutes);
app.use('/api/habits', habitManagementRoutes);
app.use('/api/admin', adminManagementRoutes);

// Start the reminder scheduling job
initializeReminders();

// Define the port to run the server
const PORT = process.env.PORT || 4000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
