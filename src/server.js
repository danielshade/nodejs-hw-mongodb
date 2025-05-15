import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';

import contactsRouter from './routes/contacts.js';
import authRouter from './routes/auth.js';
import { swaggerDocs } from './swagger/swaggerDocs.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = () => {
  const app = express();

  // --- Security & Parsing ---
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 хв
      max: 100,                 // максимум 100 запитів з однієї IP за вікно
    })
  );
  app.use(cors({ origin: process.env.APP_DOMAIN, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  // --- Routes ---
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  // --- Swagger UI ---
  swaggerDocs(app, process.env.PORT);

  // --- 404 & Error middleware ---
  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};
