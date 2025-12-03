const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.register = async (req, res) => {
const { name, email, password } = req.body;
try {
let user = await User.findOne({ email });
if (user) return res.status(400).json({ msg: 'User exists' });
user = new User({ name, email, password });
await user.save();
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) { res.status(500).json({ msg: err.message }); }
};


exports.login = async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
const isMatch = await user.comparePassword(password);
if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) { res.status(500).json({ msg: err.message }); }
};