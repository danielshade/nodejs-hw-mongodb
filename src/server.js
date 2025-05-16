// src/server.js
import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';    // <-- named import
import { authRouter }     from './routers/auth.js';        // <-- named import
import { errorHandler }   from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs }    from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR }     from './constants/index.js';
import { authenticate } from '../middlewares/authenticate.js';


const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(logger());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));

  // підключаємо рутери
  app.use('/contacts', contactsRouter);
  app.use('/auth',      authRouter);

  // документація
  app.use('/api-docs', swaggerDocs());

  // 404 і загальний хендлер помилок
  app.all('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
