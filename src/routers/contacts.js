// src/routers/contacts.js
import { Router } from 'express';
import authenticate    from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';

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

contactsRouter.use(authenticate);

contactsRouter
  .route('/')
  .get(controllerWrapper(getAllContacts))
  .post(validateBody(createContactSchema), controllerWrapper(createContact));

contactsRouter
  .route('/:id')
  .get(controllerWrapper(getContactById))
  .patch(validateBody(updateContactSchema), controllerWrapper(updateContact))
  .delete(controllerWrapper(deleteContact));

// Ось тут робимо default-експорт:
export default contactsRouter;
