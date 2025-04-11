import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getEnvVar } from '../utils/getEnvVar.js';

dotenv.config();

const DB_HOST = getEnvVar('DB_HOST');

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_HOST)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });