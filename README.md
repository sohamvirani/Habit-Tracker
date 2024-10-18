# Habit Tracker API

This API serves as the backend for a habit management application, enabling users to manage their data, log habits, and track their progress effectively.

## Key Features
- User Authentication: Secure login and registration using JWT tokens.
- Role-Based Access Control: Distinct access levels for Admins and Regular Users.
- Habit Management: Full CRUD capabilities for habits, including the ability to track progress, streaks, and frequency settings.
- Daily Reminders: Automatic notifications for pending habits to keep users on track.

## Getting Started

1. **Clone the repository:**

2. **Install dependencies:**

3. **Set up environment variables:**

4. **Start the server:**
  
5. **API Documentation:**

## Endpoints Overview

- **User Authentication**
  - `POST /api/auth/register`: Register a new user account.
  - `POST /api/auth/login`: Authenticate a user and receive a JWT for further requests.

- **Habit Management**
  - `GET /api/habits`: Retrieve a list of all habits.
  - `POST /api/habits`: Add a new habit to the user's list.
  - `PUT /api/habits/:id`: Modify an existing habit by its ID.
  - `DELETE /api/habits/:id`: Remove a habit based on its ID.
