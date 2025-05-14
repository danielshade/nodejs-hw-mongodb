// src/server.js
import express from 'express';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';
import path from 'path';

import { getEnvVar } from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';
import { authRouter } from './routers/auth.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(process.env.PORT) || 3000;

export function setupServer() {
  const app = express();

  // 1) базові мідлвари
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // 2) Swagger UI ДО логера, щоб не засмічувати логи
  app.use('/api-docs', ...swaggerDocs());

  // 3) логер
  app.use(logger());

  // 4) статика для завантажених файлів
  app.use('/uploads', express.static(path.resolve(process.cwd(), UPLOAD_DIR)));

  // 5) маршрути вашого API
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  // 6) 404 + загальний error handler
  app.all('*', notFoundHandler);
  app.use(errorHandler);

  return app;
}

export function startServer() {
  const app = setupServer();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
