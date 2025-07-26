// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

// --- Initialize App ---
const app = express();
connectDB(); // Connect to MongoDB

// --- Middleware ---
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json()); // Body parser for JSON requests

// --- API Routes ---
// The main app will use the single, consolidated route file.
app.use('/api', require('./routes/apiRoutes.js'));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));