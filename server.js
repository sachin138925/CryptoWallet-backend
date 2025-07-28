// backend/server.js

require('dotenv').config(); // <-- ADD THIS LINE AT THE VERY TOP

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// ... the rest of your server.js file remains exactly the same ...

// --- SERVER STARTUP ---
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is listening on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB. Server did not start.", err);
    process.exit(1);
});