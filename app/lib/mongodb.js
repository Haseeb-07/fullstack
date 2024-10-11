// app/lib/mongodb.js

import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017'; // Replace with your MongoDB URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected; // Track the connection status

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  console.log('MongoDB connected');
}
