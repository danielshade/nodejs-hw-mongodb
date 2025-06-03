// ── src/constants/index.js ──
import path from 'node:path';

// Для сортування
export const SORT_ORDER = {
  ASC:  'asc',
  DESC: 'desc',
};

// Якщо у вас є файл parseSortParams.js, який пише
//   import { SORT_ORDER } from '../constants/index.js';
// — то SORT_ORDER уже є і проблем бути не повинно.

// Часові константи (для токенів JWT і т. ін.)
export const FIFTEEN_MINUTES = 15 * 60 * 1000;      // 15 хвилин у мілісекундах
export const THIRTY_DAYS    = 30 * 24 * 60 * 60 * 1000; // 30 днів у мс

// Шляхи до директорій для завантажених файлів
export const UPLOAD_DIR      = path.join(process.cwd(), 'uploads');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

// Cloudinary
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY:    'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};

// SMTP (якщо у вас є відправка листів)
export const SMTP = {
  SMTP_HOST:     'SMTP_HOST',
  SMTP_PORT:     'SMTP_PORT',
  SMTP_USER:     'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM:     'SMTP_FROM',
};

// JWT‐константи
export const JWT = {
  SECRET:         'JWT_SECRET',   
  REFRESH_SECRET: 'REFRESH_SECRET',
  ACCESS_TTL:     'ACCESS_TOKEN_TTL',
  REFRESH_TTL:    'REFRESH_TOKEN_TTL',
  APP_DOMAIN:     'APP_DOMAIN',
};

// MongoDB (якщо ви імпортуєте через getEnvVar('MONGODB_URI'))
export const MONGODB = {
  URI: 'MONGODB_URI',
};

// …інші константи за потреби…
