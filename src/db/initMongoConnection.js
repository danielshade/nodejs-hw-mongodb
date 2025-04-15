import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log('Mongo connection failed', error.message);
    process.exit(1);
  }
};
