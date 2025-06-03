// src/utils/saveFileToCloudinary.js
import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

/**
 * Налаштовуємо Cloudinary лише один раз під час першого імпорту цього файлу.
 * Ми чіпляємося до тих властивостей із константи CLOUDINARY:
 *
 *   CLOUDINARY.CLOUD_NAME  → шукає process.env['CLOUDINARY_CLOUD_NAME']
 *   CLOUDINARY.API_KEY     → шукає process.env['CLOUDINARY_API_KEY']
 *   CLOUDINARY.API_SECRET  → шукає process.env['CLOUDINARY_API_SECRET']
 *
 * Тому у файлі .env у вас мають бути саме ці ключі.
 */
cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

/**
 * Завантажуємо файл у Cloudinary, після чого видаляємо локальну копію (fs.unlink).
 * @param {object} file – об’єкт multer, що містить поле `path`, яке вказує
 *                       на тимчасовий файл на диску.
 * @returns {Promise<string>} – URL на щойно завантажене зображення.
 */
export const saveFileToCloudinary = async (file) => {
  // Завантажуємо у Cloudinary з локального шляху file.path
  const response = await cloudinary.v2.uploader.upload(file.path);

  // Після успішного завантаження видаляємо тимчасовий файл із диску
  await fs.unlink(file.path);

  // Повертаємо secure_url, щоб за нього вже зберігати у моделі Contact.
  return response.secure_url;
};
