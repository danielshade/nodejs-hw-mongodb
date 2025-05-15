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

  // --- Rate Limiting ---
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  );

  // --- CORS & Parsing ---
  app.use(cors({ origin: process.env.APP_DOMAIN, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  // --- Routes ---
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  // --- Swagger docs ---
  swaggerDocs(app, process.env.PORT);

  // --- 404 & Error Handling ---
  app.use(notFoundHandler);
  app.use(errorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};
