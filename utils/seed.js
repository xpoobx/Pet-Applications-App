require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Pet = require('../models/Pet');

(async function(){
  await connectDB(process.env.MONGO_URI);
  await User.deleteMany({});
  await Pet.deleteMany({});
  const admin = new User({ name: 'Admin', email: 'admin@pets.com', password:
'password', role: 'admin' });
  await admin.save();
  const pet = new Pet({ name: 'Buddy', species: 'Dog', breed: 'Labrador', age:
3, description: 'Friendly' });
  await pet.save();
  console.log('Seed done');
  process.exit(0);
})();