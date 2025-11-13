const User = require('../models/User');


exports.getAll = async (req, res) => {
const users = await User.find().select('-password');
res.json(users);
};


exports.getOne = async (req, res) => {
const user = await User.findById(req.params.id).select('-password');
if (!user) return res.status(404).json({ msg: 'User not found' });
res.json(user);
};


exports.update = async (req, res) => {
const updates = req.body;
if (updates.password) delete updates.password; // password change via separate endpoint
const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
res.json(user);
};


exports.remove = async (req, res) => {
await User.findByIdAndDelete(req.params.id);
res.json({ msg: 'Deleted' });
};