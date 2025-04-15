import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts.js'; // ✅ правильно
// ...

export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use('/contacts', contactsRouter); // ✅ активний маршрут

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
