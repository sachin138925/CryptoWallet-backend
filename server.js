// backend/server.js

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();
const app = express();

// Whitelisted origins
const whitelist = [
  "http://localhost:3000",
  "https://cryptonest-wallet-nu.vercel.app" // Your correct frontend URL
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

// Handle CORS for all routes
app.use(cors(corsOptions));

// JSON body parser
app.use(express.json());

// API routes
app.use("/api", require("./routes/apiRoutes.js"));

module.exports = app;