// src/constants/index.js
import path from 'node:path';

// ── SORT_ORDER ──
export const SORT_ORDER = {
  ASC:  'asc',
  DESC: 'desc',
};

// ── Шляхи до директорій завантажень ──
export const UPLOAD_DIR      = path.join(process.cwd(), 'uploads');
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

// ── Cloudinary ──
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY:    'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};

// ── SMTP ──
export const SMTP = {
  SMTP_HOST:     'SMTP_HOST',
  SMTP_PORT:     'SMTP_PORT',
  SMTP_USER:     'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM:     'SMTP_FROM',
};

// ── JWT ──
export const JWT = {
  SECRET:         'JWT_SECRET',
  REFRESH_SECRET: 'REFRESH_SECRET',
  ACCESS_TTL:     'ACCESS_TOKEN_TTL',
  REFRESH_TTL:    'REFRESH_TOKEN_TTL',
  APP_DOMAIN:     'APP_DOMAIN',
};

// ── MongoDB ──
export const MONGODB = {
  URI: 'MONGODB_URI',
};

// ── Часові константи, які імпортує auth.js ──
export const FIFTEEN_MINUTES = 15 * 60 * 1000;        // 15 хвилин у мілісекундах
export const THIRTY_DAYS    = 30 * 24 * 60 * 60 * 1000; // 30 днів у мілісекундах
