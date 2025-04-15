import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts.js';
import studentsRouter from './routes/students.js';




export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use('/students', studentsRouter);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

  });
};
