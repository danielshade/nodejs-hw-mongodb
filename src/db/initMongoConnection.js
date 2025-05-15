// src/db/initMongoConnection.js
import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const uri = getEnvVar('MONGODB_URI');
    console.log(`🔍 Connecting to Mongo with URI: ${uri}`);
    await mongoose.connect(uri);
    console.log('✅ Mongo connection successfully established!');
  } catch (e) {
    console.log('❌ Error while setting up mongo connection:', e);
    throw e;
  }
};
