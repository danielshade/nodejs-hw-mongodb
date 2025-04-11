import { connectDB } from './db/connectDB.js';
import { setupServer } from './server.js';

await connectDB(); // або initMongoConnection
setupServer();

await initMongoConnection();

setupServer();
