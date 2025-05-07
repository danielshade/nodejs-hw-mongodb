import express from 'express';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEnvVar.js';
import { contactsRouter } from './routers/contacts.js';
import { authRouter } from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(logger());
  app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.all('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};
