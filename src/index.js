import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connectDB.js';
import { setupServer } from './server.js';

await connectDB();       // Підключення до бази
setupServer();           // Запуск сервера

