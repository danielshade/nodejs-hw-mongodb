// src/server.js
import express from 'express';
import cors    from 'cors';
import logger  from 'pino-http';
import cookieParser from 'cookie-parser';
import path    from 'path';

import { getEnvVar }      from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';
import { authRouter }     from './routers/auth.js';
import { swaggerDocs }    from './middlewares/swaggerDocs.js';
import notFoundHandler    from './middlewares/notFoundHandler.js';
import errorHandler       from './middlewares/errorHandler.js';
import { UPLOAD_DIR }     from './constants/index.js';

const PORT = Number(getEnvVar('PORT','3000'));



export function setupServer() {
  const app = express();

  // 1) базові middlewares
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  // 2) Першим монтуємо Swagger UI (щоб його не лого­вало)
  app.use('/api-docs', ...swaggerDocs());

  // 3) Потім “решта” з логером
  app.use(logger());

  // 4) Статика аплоадів
  app.use('/uploads', express.static(path.resolve(process.cwd(), UPLOAD_DIR)));

  // 5) API
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  // 6) 404 + error handler
  app.all('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
