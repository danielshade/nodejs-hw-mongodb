// ── src/server.js ──

import express from 'express';
import contactsRouter from './routers/contacts.js';   // (контакти ми вже імпортуємо як default)
import authRouter     from './routers/auth.js';       // тепер authRouter – default-експорт

import cors from 'cors';
import logger from 'pino-http';
import cookieParser from 'cookie-parser';
import path from 'path';
import swaggerDocs from './middlewares/swaggerDocs.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const app = express();

// 1. Базові мідлвари
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// 2. Swagger UI (щоб не засмічувати логи)
app.use('/api-docs', ...swaggerDocs());

// 3. Логер
app.use(logger());

// 4. Стаатика аплоадів
app.use('/uploads', express.static(UPLOAD_DIR));

// 5. API-роути
app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);

// 6. 404 + error handler
app.all('*', notFoundHandler);
app.use(errorHandler);

// 7. Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
