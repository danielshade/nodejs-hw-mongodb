// src/middlewares/swaggerDocs.js
import path from 'node:path';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';

import { SWAGGER_PATH } from '../constants/index.js';

export function swaggerDocs() {
  // будуємо абсолютний шлях
  const fullPath = path.resolve(process.cwd(), SWAGGER_PATH);

  // Завантажуємо YAML (наш openapi.yaml)
  const spec = YAML.load(fullPath);

  // Повертаємо саме той масив, який розгортаємо в server.js
  return [ swaggerUI.serve, swaggerUI.setup(spec) ];
}

