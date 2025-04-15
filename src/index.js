import { setupServer } from './server.js';
import initMongoConnection from './db/initMongoConnection.js';

async function bootstrap() {
  await initMongoConnection(); // Підключення до MongoDB
  setupServer();               // Запуск сервера
}

bootstrap();
