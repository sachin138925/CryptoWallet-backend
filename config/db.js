// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    // We removed require('dotenv').config(); because Vercel uses dashboard variables.
    console.log("--- Attempting to connect to MongoDB... ---");
    try {
        const mongoURI = process.env.MONGODB_URI; // This comes from the Vercel dashboard.
        if (!mongoURI) {
            // This is the most likely error reason.
            console.error('❌ MONGODB_URI is not defined in the Vercel environment variables!');
            throw new Error('MONGODB_URI is not defined'); // Cause a crash to be clear
        }
        await mongoose.connect(mongoURI);
        console.log('✅ MongoDB connected successfully.');
    } catch (err) {
        console.error('❌ MongoDB connection FAILED:', err.message);
        // This makes the function failure crash the serverless invocation.
        throw err;
    }
};

module.exports = connectDB;