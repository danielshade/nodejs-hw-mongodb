// ── src/routers/contacts.js ──

import { Router } from 'express';
import authenticate from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';

// Припустимо, що у вас у controllers/contacts.js експортуються такі функції:
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

// Також припустимо, що у вас у validation/contacts.js лежать Joi/Yup-схеми для create/update:
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const contactsRouter = new Router();

// Всі ендпоінти повинні бути захищені (перед цим має пройти middleware authentication)
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

// Ось тут ми робимо саме default-експорт, щоби у server.js можна було писати:
// import contactsRouter from './routers/contacts.js';
export default contactsRouter;
