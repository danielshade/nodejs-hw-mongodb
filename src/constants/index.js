/// src/constants/index.js
import path from 'node:path';

// ── Вже наявні експортовані значення: SORT_ORDER, UPLOAD_DIR, CLOUDINARY тощо ──
export const SORT_ORDER = {
  ASC:  'asc',
  DESC: 'desc',
};

export const UPLOAD_DIR      = path.join(process.cwd(), 'uploads');
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

export const JWT = {
  SECRET:         'JWT_SECRET',
  REFRESH_SECRET: 'REFRESH_SECRET',
  ACCESS_TTL:     'ACCESS_TOKEN_TTL',
  REFRESH_TTL:    'REFRESH_TOKEN_TTL',
  APP_DOMAIN:     'APP_DOMAIN',
};

export const MONGODB = {
  URI: 'MONGODB_URI',
};

// ── Додаємо константи часу, які використовуються в auth.js ──
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS    = 30 * 24 * 60 * 60 * 1000;

// ── Ось цей рядок додаємо, щоб зникла помилка про TEMPLATES_DIR ──
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

// ── За потреби ще інші константи (наприклад, якщо в коді шукаються SMTP тощо). ──
