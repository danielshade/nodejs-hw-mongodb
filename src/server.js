import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import authRouter     from './routers/auth.js';
import { errorHandler }    from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs }     from './middlewares/swaggerDocs.js';
import { UPLOAD_DIR }      from './constants/index.js';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(logger());
  app.use(cookieParser());
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use('/contacts', contactsRouter);
  app.use('/auth',     authRouter);

  app.use('/api-docs', swaggerDocs());

  app.all('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(getEnvVar('PORT', '3000'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
