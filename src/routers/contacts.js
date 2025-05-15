// src/routers/contacts.js
import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

// всі ендпоінти — тільки авторизовані
contactsRouter.use(authenticate);

contactsRouter
  .route('/')
  .get(getAllContacts)
  .post(validateBody(createContactSchema), createContact);

contactsRouter
  .route('/:id')
  .get(getContactById)
  .patch(validateBody(updateContactSchema), updateContact)
  .delete(deleteContact);

export default contactsRouter;
