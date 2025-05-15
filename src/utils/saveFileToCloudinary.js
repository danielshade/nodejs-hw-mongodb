// src/utils/saveFileToCloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import { getEnvVar } from './getEnvVar.js';

cloudinary.config({
  secure: true,
  cloud_name:  getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key:     getEnvVar('CLOUDINARY_API_KEY'),
  api_secret:  getEnvVar('CLOUDINARY_API_SECRET'),
});

/**
 * Завантажує файл у Cloudinary і видаляє його локальну копію.
 * @param {{ path: string }} file — обʼєкт, що повертає multer.
 * @returns {Promise<string>} — URL завантаженого зображення.
 */
export async function saveFileToCloudinary(file) {
  const result = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);
  return result.secure_url;
}
