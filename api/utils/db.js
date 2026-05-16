const mongoose = require('mongoose');

let isConnecting = false;

const connectDB = async () => {
  // Already connected
  if (mongoose.connections[0].readyState === 1) return;
  
  // Connection is in progress — wait for it
  if (isConnecting) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (mongoose.connections[0].readyState === 1) return;
    throw new Error('MongoDB connection in progress, try again');
  }
  
  isConnecting = true;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000, // 15 seconds timeout for cold starts
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    // Don't process.exit — let the middleware return 503 so server stays alive
    throw err;
  } finally {
    isConnecting = false;
  }
};

module.exports = connectDB;

