// src/index.js
import initMongoConnection from './db/initMongoConnection.js'; // default import
import setupServer from './server.js';                          // default import

import createDirIfNotExists from './utils/createDirIfNotExists.js'; // default import
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';  // named import

const startServer = async () => {
  try {
    // 1) Підключаємося до MongoDB
    await initMongoConnection();

    // 2) Створюємо тимчасову та фінальну папки для аплоаду, якщо їх ще немає
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);

    // 3) Запускаємо конфігурацію Express-сервера
    setupServer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

void startServer();
