const Pet = require('../models/Pet');


exports.create = async (req, res) => {
const pet = new Pet(req.body);
await pet.save();
res.status(201).json(pet);
};


exports.getAll = async (req, res) => {
const pets = await Pet.find();
res.json(pets);
};


exports.getOne = async (req, res) => {
const pet = await Pet.findById(req.params.id);
if (!pet) return res.status(404).json({ msg: 'Pet not found' });
res.json(pet);
};


exports.update = async (req, res) => {
const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json(pet);
};


exports.remove = async (req, res) => {
await Pet.findByIdAndDelete(req.params.id);
res.json({ msg: 'Deleted' });
};