// src/constants/index.js
import path from 'node:path';

// ── Додаємо SORT_ORDER, щоб імпорт у parseSortParams.js знаходив його:
export const SORT_ORDER = {
  ASC:  'asc',
  DESC: 'desc',
};

// ── Інші константи, які у вас уже є:
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY:    'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};

export const SMTP = {
  SMTP_HOST:     'SMTP_HOST',
  SMTP_PORT:     'SMTP_PORT',
  SMTP_USER:     'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM:     'SMTP_FROM',
};

// Якщо є інші експортовані константи (JWT, MONGODB тощо), вони теж лишаються тут:
export const JWT = {
  SECRET:        'JWT_SECRET',
  REFRESH_SECRET: 'REFRESH_SECRET',
  ACCESS_TTL:    'ACCESS_TOKEN_TTL',
  REFRESH_TTL:   'REFRESH_TOKEN_TTL',
  APP_DOMAIN:    'APP_DOMAIN',
};

export const MONGODB = {
  URI: 'MONGODB_URI',
};

// …та інші, що вам потрібні…
