import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getEnvVar } from '../utils/getEnvVar.js';

dotenv.config();

const DB_HOST = getEnvVar('DB_HOST');

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Підключення до MongoDB успішне');
  } catch (error) {
    console.error('❌ Помилка підключення до MongoDB:', error.message);
    process.exit(1);
  }
};