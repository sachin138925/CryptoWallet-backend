// The final, complete server.js file
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB(); // Connect to the database

const app = express();
const whitelist = [ "http://localhost:3000", "https://cryptonest-wallet-nu.vercel.app" ];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", require("./routes/apiRoutes.js")); // Use your correct routes
module.exports = app;