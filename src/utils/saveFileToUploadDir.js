import path from 'node:path';
import fs from 'node:fs/promises';

import { UPLOAD_DIR } from '../constants/index.js';

export const saveFileToUploadDir = async (file) => {
  const fileName = file.originalname;
  const uploadPath = path.join(UPLOAD_DIR, fileName);
  await fs.rename(file.path, uploadPath);
  return uploadPath;
};
