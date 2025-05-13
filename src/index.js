// src/index.js
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

// Відловлюємо всі unhandled rejections, щоб бачити справжню помилку:
process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection:', reason);
});

(async () => {
  try {
    await initMongoConnection();
    console.log('✅ MongoDB connected');
    setupServer();
  } catch (err) {
    console.error('❌ Startup failed:', err);
    process.exit(1);
  }
})();
