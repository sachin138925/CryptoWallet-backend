// config/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("--- Attempting to connect to MongoDB... ---");
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error('❌ MONGODB_URI is not defined in environment variables');
            return;
        }
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully.');
    } catch (err) {
        console.error('❌ MongoDB connection FAILED:', err.message);
    }
};

module.exports = connectDB;