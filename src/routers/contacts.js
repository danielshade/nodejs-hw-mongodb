// src/routers/contacts.js
import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  updateStatusController,
  removeContactController,
} from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', authenticate, controllerWrapper(getAllContactsController));

contactsRouter.get(
  '/:id',
  authenticate,
  isValidId,
  controllerWrapper(getContactByIdController),
);

contactsRouter.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createContactSchema),
  controllerWrapper(addContactController),
);

contactsRouter.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateContactSchema),
  controllerWrapper(updateContactController),
);

contactsRouter.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  controllerWrapper(updateStatusController),
);

contactsRouter.delete(
  '/:id',
  authenticate,
  isValidId,
  controllerWrapper(removeContactController),
);

// Ось це рядок додає дефолт-експорт:
export default contactsRouter;
