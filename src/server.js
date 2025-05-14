// src/server.js
import express from 'express';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import cors    from 'cors';
import logger  from 'pino-http';
import cookieParser from 'cookie-parser';
import path    from 'path';

import { getEnvVar }      from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';
import { authRouter }     from './routers/auth.js';
import notFoundHandler    from './middlewares/notFoundHandler.js';
import errorHandler       from './middlewares/errorHandler.js';
import { UPLOAD_DIR }     from './constants/index.js';

const PORT = Number(getEnvVar('PORT','3000'));



e// 1) базові мідлвари
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // 2) підключаємо Swagger UI ПЕРЕД логером, щоб він не засмічував логи
   app.use('/api-docs', ...swaggerDocs());

  // 3) логер
  app.use(logger());

  // 4) статика аплоадів
  app.use('/uploads', express.static(UPLOAD_DIR));

  // 5) решта рутів
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  // 6) 404 + error handler
  app.all('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));