// src/routers/contacts.js
import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusController,
  removeContactController,
} from '../controllers/contacts.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get(
  '/',
  controllerWrapper(getAllContactsController),
);

contactsRouter.get(
  '/:id',
  isValidId,
  controllerWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  controllerWrapper(addContactController),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(updateContactSchema),
  controllerWrapper(updateContactController),
);

contactsRouter.patch(
  '/:id/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  controllerWrapper(updateStatusController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  controllerWrapper(removeContactController),
);

// Додаємо дефолт-експорт
export default contactsRouter;
