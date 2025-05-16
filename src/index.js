import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

import { createDirIfNotExists } from './utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';

const startServer = async () => {
  // 1) підключаємось до Mongo
  await initMongoConnection();

  // 2) гарантовано створюємо папки для завантажень
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);

  // 3) стартуємо Express
  setupServer();
};

startServer();
