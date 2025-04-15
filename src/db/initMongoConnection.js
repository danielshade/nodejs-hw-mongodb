import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_HOST } = process.env;

const initMongoConnection = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection failed', error.message);
    process.exit(1);
  }
};

export default initMongoConnection;
