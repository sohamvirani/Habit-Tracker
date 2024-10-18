const User = require('../models/User');
const generateToken = require('../helpers/generateToken');

// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      token: generateToken(newUser),
    });
  } catch (err) {
    res.status(400).json({ error: 'Registration unsuccessful' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser || !(await existingUser.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ token: generateToken(existingUser) });
  } catch (err) {
    res.status(400).json({ error: 'Login attempt failed' });
  }
};

// Fetch user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select('-password');
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json({ error: 'Could not retrieve user profile' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userToUpdate = await User.findById(req.user.id);

    if (name) userToUpdate.name = name;
    if (email) userToUpdate.email = email;
    if (password) userToUpdate.password = password;

    await userToUpdate.save();

    res.status(200).json({
      success: true,
      token: generateToken(userToUpdate),
    });
  } catch (err) {
    res.status(400).json({ error: 'Profile update failed' });
  }
};

// Delete user account
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.user.id);
    res.status(200).json({ message: 'User account successfully deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user account' });
  }
};
