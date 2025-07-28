const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();
const app = express();

// Whitelisted origins (add more if needed)
const whitelist = [
  "http://localhost:3000",
  "https://crypto-wallet-black.vercel.app"
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// Handle CORS
app.options("*", cors(corsOptions)); // For pre-flight
app.use(cors(corsOptions));          // For actual requests

// JSON body parser
app.use(express.json());

// API routes
app.use("/api", require("./routes/apiRoutes.js"));

module.exports = app;
