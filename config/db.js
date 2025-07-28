// backend/config/db.js

const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("--- DEBUG: Inside connectDB function ---"); // Breadcrumb #1

    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        console.error('❌ FATAL: MONGODB_URI environment variable was NOT FOUND by the server.');
        throw new Error('MONGODB_URI is not defined');
    }

    console.log('✅ DEBUG: MONGODB_URI was found.'); // Breadcrumb #2
    // For security, we will only log the database host and name, not the password.
    const safeURI = mongoURI.substring(mongoURI.indexOf('@'));
    console.log(`✅ DEBUG: Attempting to connect to host: ${safeURI}`);


    try {
        console.log("--- DEBUG: Attempting mongoose.connect() now... ---"); // Breadcrumb #3
        await mongoose.connect(mongoURI);
        console.log('✅ SUCCESS: MongoDB connection SUCCEEDED.'); // Breadcrumb #4
    } catch (err) {
        console.error('❌ FATAL: mongoose.connect() FAILED. This is a connection, authentication, or IP block error.'); // Breadcrumb #5
        console.error('--- Full Mongoose Error Below ---');
        console.error(err); // This will print the detailed error from the database driver.
        console.error('--- End of Mongoose Error ---');
        throw err; // Re-throw the error to ensure the serverless function crashes.
    }
};

module.exports = connectDB;