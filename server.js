const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

console.log("--- Server process starting ---");

// Connect to the database immediately.
connectDB();

const app = express();
console.log("--- Express app initialized ---");


// --- Middleware Configuration ---
const allowedOrigin = process.env.CORS_ORIGIN;
console.log(`--- CORS Origin set to: ${allowedOrigin} ---`);

const corsOptions = {
  origin: allowedOrigin,
};

// 1. THIS IS THE FIX: Enable CORS pre-flight across-the-board.
app.options('*', cors(corsOptions));

// 2. Use CORS for all other requests.
app.use(cors(corsOptions));

// 3. Use the body parser.
app.use(express.json());
console.log("--- Middleware (CORS, JSON) applied ---");


// --- API Routes ---
app.use('/api', require('./routes/apiRoutes.js'));
console.log("--- API routes wired up ---");


// Export the app for Vercel's serverless environment.
module.exports = app;
console.log("--- Server module exported ---");