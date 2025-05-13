// src/server.js
import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';
import path from 'path';

import { getEnvVar } from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';
import { authRouter } from './routers/auth.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export function setupServer() {
  const app = express();

  // Парсинг JSON і CORS-політика
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // ⚡️ Сервимо документацію до того, як підключається логер
  app.use('/api-docs', ...swaggerDocs());

  // Логування всього решта трафіку (окрім /api-docs)
  app.use(logger());

  // Статика для завантажених файлів
  app.use('/uploads', express.static(path.resolve(process.cwd(), UPLOAD_DIR)));

  // Роутери
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  // Обробка 404 та помилок
  app.all('*', notFoundHandler);
  app.use(errorHandler);

  // Старт сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
