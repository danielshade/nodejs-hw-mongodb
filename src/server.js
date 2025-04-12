import express from 'express';
import cors from 'cors';
import logger from 'pino-http';

import { contactsRouter } from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(logger());

  // 👉 Кореневий маршрут
  app.get('/', (req, res) => {
    res.status(200).json({ message: '✅ API is running!' });
  });

  // 👉 Основний роутер для контактів
  app.use('/contacts', contactsRouter);

  // 👉 Обробка неіснуючих маршрутів
  app.all('*', notFoundHandler);

  // 👉 Глобальний обробник помилок
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}

