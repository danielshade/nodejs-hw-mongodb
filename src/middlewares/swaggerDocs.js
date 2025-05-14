import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yaml';              // або 'yamljs', як вам зручніше
import { SWAGGER_PATH } from '../constants/index.js';

export function swaggerDocs() {
  // зчитуємо файл YAML
  const file = fs.readFileSync(SWAGGER_PATH, 'utf8');
  // парсимо в JS-обʼєкт
  const swaggerSpec = YAML.parse(file);

  // повертаємо масив, який ми підключаємо у server.js
  return [ swaggerUI.serve, swaggerUI.setup(swaggerSpec) ];
}
