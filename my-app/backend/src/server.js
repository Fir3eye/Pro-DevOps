// src/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const imageRoutes = require('./routes/imageRoutes');
const sessionMiddleware = require('./config/session');
require('dotenv').config();

const app = express();

// Configure CORS to allow credentials
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(sessionMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);

// Sync Database and Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to sync database:', err);
});
