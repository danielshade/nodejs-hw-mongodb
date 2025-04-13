import express from 'express';
import cors from 'cors';
import contactsRouter from './routers/contacts.js';

export const setupServer = () => {
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
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
