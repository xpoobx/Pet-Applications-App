const mongoose = require('mongoose');


const ApplicationSchema = new mongoose.Schema({
pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
message: { type: String },
status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Application', ApplicationSchema);