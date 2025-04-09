import express from 'express';

import pino from 'pino-http';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';

import { getAllContacts } from './services/contacts.js';
import { getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', '9393'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json(
      {
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      }
    );
  });
  
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
      if (!contact)
        return res.json(
      {
          status: 404,
          message: 'Contact not found',
      }
    );
    res.json(
      {
        status: 200,
        message: 'Successfully found contacts!',
        data: contact,
      }
    );
  });

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });
  
  app.use((err, req, res, next) => {
    res.status(500).json(
      {
        message: 'Something went wrong',
        error: err.message,
      }
    );
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
