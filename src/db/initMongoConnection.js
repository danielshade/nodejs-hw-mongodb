// src/db/initMongoConnection.js
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

async function initMongoConnection() {
  const mongoUrl = getEnvVar('MONGO_URL');
  await mongoose.connect(mongoUrl);
  console.log('✅ MongoDB connected');
}

export default initMongoConnection;
