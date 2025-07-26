const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');

connectDB();
const app = express();

const allowedOrigin = "https://crypto-wallet-black.vercel.app" || 'http://localhost:3000';
const corsOptions = { origin: allowedOrigin };

app.options('*', cors(corsOptions)); // Handle pre-flight requests
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', require('./routes/apiRoutes.js'));

module.exports = app;