const User = require('../models/User');

// Get all users (admin only)
exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get a single user by ID
exports.getOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update a user by ID (admin or owner check could be added)
exports.update = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) delete updates.password; // password change handled separately
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get logged-in user
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// Update logged-in user
exports.updateCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const updates = { ...req.body };
    if (updates.password) delete updates.password; // separate endpoint for password
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');

    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ msg: err.message });
  }
};

// Delete a user (admin only)
exports.remove = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
