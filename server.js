const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

// Initialize the Express App
const app = express();

// --- Middleware Configuration ---
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// --- API Routes ---
app.use('/api', require('./routes/apiRoutes.js'));

// --- Database Connection and Server Start ---
const startServer = async () => {
  await connectDB();
  // This part is for local development and is ignored by Vercel
  if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  }
};

startServer();

// Export the app for Vercel's serverless environment
module.exports = app;