import fs from 'node:fs/promises';
import path from 'node:path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToUploadDir = async (file) => {
  const dest = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), dest);
  // повертаємо URL, щоб фронт міг його показати
  return `${getEnvVar('APP_DOMAIN').replace(/\/$/, '')}/uploads/${file.filename}`;
};
