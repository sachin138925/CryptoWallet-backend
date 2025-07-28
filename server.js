// A Bare Minimum server.js for Vercel Debugging

const express = require("express");
const cors = require("cors");

const app = express();

// Use a simple, wide-open CORS policy for this test
app.use(cors());

// A simple test route that does not require any other files
app.get("/api/health", (req, res) => {
    // This message proves the server is running.
    res.status(200).json({ status: "The bare minimum server is alive!" });
});

// We are not including the main router to avoid dependency errors
// app.use("/api", require("./routes/apiRoutes.js"));

module.exports = app;