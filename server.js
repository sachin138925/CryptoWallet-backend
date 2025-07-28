// backend/server.js

require('dotenv').config(); // This is for local testing, Vercel will ignore it.

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// We call this immediately. If it fails, the logs on Vercel will show the error.
connectDB();

const app = express();

// Whitelisted origins
const whitelist = [
  "http://localhost:3000",
  "https://cryptonest-wallet-nu.vercel.app"
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// --- MIDDLEWARE ---
app.use(cors(corsOptions));
app.use(express.json());

// --- ROUTES ---
app.use("/api", require("./routes/apiRoutes.js"));

// --- EXPORT FOR VERCEL ---
// This is the correct way for a serverless environment. NO app.listen()!
module.exports = app;