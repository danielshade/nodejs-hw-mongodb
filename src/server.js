// src/server.js
import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import swaggerDocs from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  // безпека HTTP-заголовків
  app.use(helmet());

  // простий лімітер — 100 запитів з однієї IP за 15 хв
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    })
  );

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(logger());

  // статика для завантажених файлів
  app.use('/uploads', express.static(UPLOAD_DIR));

  // головні ендпоінти
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  // документація Swagger UI
  app.use('/api-docs', swaggerDocs());

  // 404 і обробка помилок
  app.all('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
