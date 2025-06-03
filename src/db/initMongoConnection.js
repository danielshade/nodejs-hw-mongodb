// src/db/initMongoConnection.js
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export default async function initMongoConnection() {
  // Забираємо прямо з .env єдину змінну
  const mongoUri = getEnvVar('MONGODB_URI');

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('✖️ MongoDB connection error:', err);
    throw err;
  }
}
