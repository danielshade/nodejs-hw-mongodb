import connectDB from './db/connectDB.js';
import { setupServer } from './server.js';

await connectDB();
setupServer();
