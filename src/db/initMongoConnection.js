import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const uri = getEnvVar('MONGODB_URI');
    await mongoose.connect(uri);
    console.log('✅ Mongo connection successfully established!');
  } catch (e) {
    console.error('❌ Error while setting up mongo connection:', e);
    throw e;
  }
};
