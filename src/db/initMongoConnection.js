const mongoose = require('mongoose');
require('dotenv').config();

const { DB_HOST } = process.env;

if (!DB_HOST) {
  console.error('❌ DB_HOST не вказано у .env файлі');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Підключення до MongoDB успішне');
  } catch (error) {
    console.error('❌ Помилка підключення до MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
