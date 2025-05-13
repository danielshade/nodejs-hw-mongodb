import path from 'path';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';

import { SWAGGER_PATH } from '../constants/index.js';

export function swaggerDocs() {
  
  const swaggerDoc = YAML.load(path.resolve(process.cwd(), SWAGGER_PATH));

  return [ swaggerUI.serve, swaggerUI.setup(swaggerDoc) ];
}
