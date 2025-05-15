// src/index.js
import initMongoConnection from './db/initMongoConnection.js'
import setupServer         from './server.js'

async function startApp() {
  try {
    await initMongoConnection()
    setupServer()
  } catch (err) {
    console.error('Startup error:', err)
    process.exit(1)
  }
}

startApp()
