// src/index.js
import 'dotenv/config';                           // щоб можна було читати .env
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const PORT = Number(process.env.PORT ?? 3000);

async function startApp() {
  try {
    await initMongoConnection();                   // чекаємо на коннект до Mongo
    const app = setupServer();                     // збираємо express-app
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Startup failed:', err);
    process.exit(1);
  }
}

startApp();
