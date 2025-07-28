// The final, complete server.js for a Render deployment
require('dotenv').config(); // For local development
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const whitelist = ["http://localhost:3000", "https://cryptonest-wallet-nu.vercel.app"];
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
app.use("/api", require("./routes/apiRoutes.js"));

// Render provides the PORT environment variable.
const PORT = process.env.PORT || 5000;

// Connect to DB and then start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is listening on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB. Server did not start.", err);
    process.exit(1); // Exit with failure
});