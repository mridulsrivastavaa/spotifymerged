// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS to allow requests from your frontend
app.use(cors());

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Mount authentication routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Start the server on the port specified in .env or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
