const Application = require('../models/Application');
const Pet = require('../models/Pet');


exports.create = async (req, res) => {
const app = new Application({ ...req.body, applicant: req.user._id });
await app.save();
res.status(201).json(app);
};


exports.getAll = async (req, res) => {
const apps = await Application.find().populate('pet').populate('applicant','name email');
res.json(apps);
};


exports.getOne = async (req, res) => {
const app = await Application.findById(req.params.id).populate('pet').populate('applicant','name email');
if (!app) return res.status(404).json({ msg: 'Application not found' });
res.json(app);
};


exports.updateStatus = async (req, res) => {
const { status } = req.body; // 'approved' or 'rejected'
const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('pet');
if (!app) return res.status(404).json({ msg: 'Application not found' });
if (status === 'approved'){
await Pet.findByIdAndUpdate(app.pet._id, { status: 'adopted' });
}
res.json(app);
};


exports.remove = async (req, res) => {
await Application.findByIdAndDelete(req.params.id);
res.json({ msg: 'Deleted' });
};