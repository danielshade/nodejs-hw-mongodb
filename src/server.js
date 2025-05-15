// src/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import contactsRouter from './routes/contacts.js';
import authRouter from './routes/auth.js';
import swaggerRouter from './swagger/swagger.js';      // ваше налаштування сваггера
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

export function setupServer() {
  const app = express();

  // standard middlewares
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
  app.use(morgan('tiny'));

  // rate limiter: максимум 100 запитів з однієї IP за 15 хвилин
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // ендпоінти
  app.use('/api/auth', authRouter);
  app.use('/api/contacts', contactsRouter);

  // swagger-ui
  app.use('/api-docs', swaggerRouter);

  // 404 і глобальний обробник помилок
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
