const mongoose = require('mongoose');


const PetSchema = new mongoose.Schema({
name: { type: String, required: true },
species: { type: String, required: true },
breed: { type: String },
age: { type: Number },
sex: { type: String, enum: ['male','female','unknown'], default: 'unknown' },
description: { type: String },
status: { type: String, enum: ['available','reserved','adopted'], default: 'available' },
photos: [String],
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Pet', PetSchema);