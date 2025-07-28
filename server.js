// backend/server.js

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

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

// --- MIDDLEWARE ---
app.use(cors(corsOptions));
app.use(express.json());

// --- ROUTES ---
app.use("/api", require("./routes/apiRoutes.js"));

// --- SERVER STARTUP (This is the new, important part for Render) ---
// Render provides the PORT environment variable for your service.
const PORT = process.env.PORT || 5000;

// Connect to the database first, and only then start the server.
connectDB().then(() => {
    app.listen(PORT, () => {
        // This message will appear in your Render logs when it's successful.
        console.log(`✅ Server is listening on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB. Server did not start.", err);
    process.exit(1); // This tells Render that the startup failed.
});

// We no longer need 'module.exports = app;'