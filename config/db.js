// config/db.js (Clean Version)
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error('MONGODB_URI is not defined in environment variables');
            throw new Error('MONGODB_URI not found');
        }
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully.');
    } catch (err) {
        console.error('❌ MongoDB connection FAILED:', err.message);
        throw err; // This will cause the server startup to fail clearly.
    }
};

module.exports = connectDB;