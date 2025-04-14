import express from 'express';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running!' });
});

app.use('/contacts', contactsRouter); 

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const bootstrap = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Mongo connection successfully established!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
};

bootstrap();
