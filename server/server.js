require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const petRoutes = require('./routes/pets.routes');
const applicationRoutes = require('./routes/applications.routes');

const app = express();

const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173',
  'https://pet-applications-app.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy does not allow access from ${origin}`));
    }
  },
  credentials: true,
}));


app.use(bodyParser.json());

// connect to database
connectDB(process.env.MONGO_URI);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
