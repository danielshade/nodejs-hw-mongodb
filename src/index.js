// Якщо раніше було: import { setupServer } from './server.js';
// Просто замініть на:
import './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();