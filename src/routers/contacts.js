// src/routers/contacts.js
import { Router } from 'express';
// ↓ тут помилково вказано contactsController.js, а насправді файл називається contacts.js
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';  
import authenticate from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';

const contactsRouter = new Router();

contactsRouter.use(authenticate);

contactsRouter
  .route('/')
  .get(getAllContacts)
  .post(validateBody(), createContact);

contactsRouter
  .route('/:id')
  .get(getContactById)
  .patch(validateBody(), updateContact)
  .delete(deleteContact);

export default contactsRouter;
