const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 4000
    });
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${process.env.MONGODB_URI}`);
    console.warn(`[Database Warning] ${error.message}`);
    console.log(`[Database] Standard MongoDB routes will operate. Please ensure MongoDB is running or update MONGODB_URI in server/.env.`);
    return false;
  }
};

module.exports = connectDB;
