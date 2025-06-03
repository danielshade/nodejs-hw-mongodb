// src/utils/getEnvVar.js
import dotenv from 'dotenv';

// Завантажуємо .env у process.env
dotenv.config();

/**
 * Повертає значення змінної середовища з ключем `name`.
 * Якщо змінна не знайдена, але передано defaultValue — повертає defaultValue.
 * Якщо не знайдено ані змінної, ані defaultValue — кидає помилку.
 *
 * @param {string} name         — назва змінної середовища, наприклад "MONGODB_URI" або "CLOUDINARY_API_KEY"
 * @param {string} [defaultValue] — необов’язкове значення за замовчуванням
 * @returns {string} Значення process.env[name] або defaultValue
 * @throws {Error} Якщо змінна не знайдена і defaultValue не передане.
 */
export function getEnvVar(name, defaultValue) {
  const value = process.env[name];

  if (value && value !== '') {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Missing: process.env['${name}'].`);
}
