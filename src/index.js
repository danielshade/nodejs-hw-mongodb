// src/index.js
import 'dotenv/config';                       // завантажує .env у process.env
import initMongoConnection from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const PORT = Number(process.env.PORT ?? 3000);

async function startApp() {
  try {
    await initMongoConnection();             // чекаємо з’єднання з MongoDB
    const app = setupServer();               // збираємо Express-app (всі middlewares, роутери, swagger тощо)
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Startup failed:', err);
    process.exit(1);
  }
}

startApp();
