// src/utils/saveFileToCloudinary.js

import { v2 as cloudinary } from 'cloudinary';
import fs            from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

// Налаштовуємо Cloudinary, підхоплюючи правильні ключі з .env
cloudinary.config({
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),   // напр. 'CLOUDINARY_CLOUD_NAME'
  api_key:    getEnvVar(CLOUDINARY.API_KEY),       // напр. 'CLOUDINARY_API_KEY'
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),    // напр. 'CLOUDINARY_API_SECRET'
});

export const saveFileToCloudinary = async (file) => {
  // Завантажуємо файл у Cloudinary
  const response = await cloudinary.uploader.upload(file.path);
  // Видаляємо локально завантажений файл
  await fs.unlink(file.path);
  // Повертаємо secure_url із відповіді Cloudinary
  return response.secure_url;
};
