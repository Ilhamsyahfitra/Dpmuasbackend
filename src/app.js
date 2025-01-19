require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const profileRoutes = require('./routes/profileRoutes');
const comicRoutes = require('./routes/comicRoutes');
const setupSwagger = require('./swagger'); // Assuming you have a swagger setup function

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Middleware
app.use(express.json());

// Middleware CORS
app.use(cors({
  origin: 'http://localhost:8081', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow credentials if needed
}));

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || process.env.mongodb_URI; // Using variables from .env
if (!mongoURI) {
    console.error('MongoDB URI is missing. Check your .env file.');
    process.exit(1); // Stop if MongoDB URI is not found
}

mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/comics', comicRoutes);

// Swagger Setup
setupSwagger(app);

// Server Start
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
