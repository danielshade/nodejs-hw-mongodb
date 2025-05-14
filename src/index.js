// src/index.js
import initMongoConnection from './db/initMongoConnection.js';
import './server.js';   // server.js сам виконає app.listen

async function startApp() {
  try {
    await initMongoConnection();
  } catch (err) {
    console.error('❌ DB connection error:', err);
    process.exit(1);
  }
}

startApp();
