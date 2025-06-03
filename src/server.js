// src/server.js
import express from 'express';
import swaggerDocs from './middlewares/swaggerDocs.js';
import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';

// import contactsRouter як default – тепер це безпомилково спрацює:
import contactsRouter from './routers/contacts.js';
import authRouter     from './routers/auth.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler    from './middlewares/errorHandler.js';
import { UPLOAD_DIR }  from './constants/index.js';

export default function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use('/api-docs', ...swaggerDocs());
  app.use(logger());
  app.use('/uploads', express.static(UPLOAD_DIR));

  // Тепер обидва імпорти (contactsRouter та authRouter) – default:
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.all('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(process.env.PORT) || 3000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
