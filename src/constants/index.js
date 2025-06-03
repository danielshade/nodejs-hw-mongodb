// src/constants/index.js
import path from 'node:path';
export const SMTP = {
  SMTP_HOST:     'SMTP_HOST',
  SMTP_PORT:     'SMTP_PORT',
  SMTP_USER:     'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM:     'SMTP_FROM',
};

export const UPLOAD_DIR      = path.join(process.cwd(), 'uploads');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const TEMPLATES_DIR   = path.join(process.cwd(), 'src', 'templates');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',  // так має називатися змінна в .env
  API_KEY:    'CLOUDINARY_API_KEY',      // так само
  API_SECRET: 'CLOUDINARY_API_SECRET',   // так само
};

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
