import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    console.log('🔍 Mongo creds:', {
      user: process.env.MONGODB_USER,
      pwd: process.env.MONGODB_PASSWORD?.slice(0,3) + '…',
      url: process.env.MONGODB_URL,
      db:  process.env.MONGODB_DB
    });
    

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}` +
        '?retryWrites=true&w=majority&appName=homeWork'
    );
    console.log('✅ Mongo connection successfully established!');
  } catch (e) {
    console.error('❌ Error while setting up mongo connection', e);
    throw e;
  }
};