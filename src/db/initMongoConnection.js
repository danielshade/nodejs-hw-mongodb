// src/db/initMongoConnection.js
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export async function initMongoConnection() {
  const MONGO_URL = getEnvVar('MONGO_URL');
  await mongoose.connect(MONGO_URL);
  console.log('✅ MongoDB connected');
}
