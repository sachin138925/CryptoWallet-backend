// A Bare Minimum server.js for Vercel Debugging

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// We are NOT adding the JSON parser yet, to keep it simple
// app.use(express.json());

// --- ADDING THE ROUTER BACK ---
// If the server crashes now, the error is in one of the files required by apiRoutes.js
app.use("/api", require("./routes/apiRoutes.js"));

module.exports = app;