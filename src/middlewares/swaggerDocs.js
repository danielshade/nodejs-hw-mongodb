// src/middlewares/swaggerDocs.js
import fs from 'node:fs'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yaml'
import { SWAGGER_PATH } from '../constants/index.js'

export default function swaggerDocs() {
  // читаємо та парсимо openapi.yaml
  const file = fs.readFileSync(SWAGGER_PATH, 'utf8')
  const swaggerSpec = YAML.parse(file)

  return [ swaggerUI.serve, swaggerUI.setup(swaggerSpec) ]
}
