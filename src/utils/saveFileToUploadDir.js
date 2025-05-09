import fs from 'fs/promises';
import path from 'path';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export async function saveFileToUploadDir(file) {
  const dest = path.join(UPLOAD_DIR, file.filename);
  await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), dest);
  return `${getEnvVar('APP_DOMAIN').replace(/\/$/, '')}/uploads/${file.filename}`;
}
