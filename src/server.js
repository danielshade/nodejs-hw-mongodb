import express from 'express';
import cors from 'cors';

import contactsRouter from './routes/contacts.js';
import studentsRouter from './routes/students.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Маршрути повинні йти перед 404
  app.use('/contacts', contactsRouter);
  app.use('/students', studentsRouter);

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
