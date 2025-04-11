import { connectDB } from './db/connectDB.js';
import { setupServer } from './server.js';

await connectDB();
setupServer();
import { setupServer } from './server.js';

await initMongoConnection();

setupServer();
