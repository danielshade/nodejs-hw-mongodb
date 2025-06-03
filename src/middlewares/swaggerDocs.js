// src/middlewares/swaggerDocs.js
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import yaml from 'js-yaml';
import { SWAGGER_PATH } from '../constants/index.js';

/**
 * Повертає масив middleware для підключення Swagger UI:
 * [swaggerUi.serve, swaggerUi.setup(документ)]
 */
export default function swaggerDocs() {
  // Читаємо JSON (а якщо ваш swagger у форматі YAML – треба конвертувати)
  const swaggerDocument = JSON.parse(fs.readFileSync(SWAGGER_PATH, 'utf8'));
  return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
}
