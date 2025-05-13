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

  // 1) Загальні middleware
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // 2) Документація — **до** логера, щоб не лого­вати весь JSON
  app.use('/api-docs', ...swaggerDocs());

  // 3) Логер (залогуватиме все ОКРІМ /api-docs)
  app.use(logger());

  // 4) Статика завантажених файлів
  app.use('/uploads', express.static(path.resolve(process.cwd(), UPLOAD_DIR)));

  // 5) Основні роутери
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  // 6) 404 + error handler
  app.all('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}