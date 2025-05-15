// src/server.js
import express from 'express'
import swaggerDocs from './middlewares/swaggerDocs.js'
import cors from 'cors'
import logger from 'pino-http'
import cookieParser from 'cookie-parser'

import contactsRouter from './routers/contacts.js'
import authRouter     from './routers/auth.js'
import notFoundHandler from './middlewares/notFoundHandler.js'
import errorHandler    from './middlewares/errorHandler.js'
import { UPLOAD_DIR } from './constants/index.js'

export default function setupServer() {
  const app = express()

  // 1) базові middleware
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())

  // 2) Swagger UI (перед логером, щоб не засмічувати логи)
  app.use('/api-docs', ...swaggerDocs())

  // 3) логер
  app.use(logger())

  // 4) статика аплоадів
  app.use('/uploads', express.static(UPLOAD_DIR))

  // 5) API-роути
  app.use('/contacts', contactsRouter)
  app.use('/auth', authRouter)

  // 6) 404 + error handler
  app.all('*', notFoundHandler)
  app.use(errorHandler)

  // 7) запуск сервера на порті з ENV || 3000
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))
}
