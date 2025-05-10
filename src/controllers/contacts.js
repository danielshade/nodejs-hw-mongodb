// src/routers/contacts.js
import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactCreateSchema, contactUpdateSchema } from '../schemas/contactSchemas.js';
import {
  createContactController,
  getContactsController,
  getContactByIdController,
  updateContactByIdController,
  deleteContactByIdController
} from '../controllers/contacts.js';

const router = express.Router();

// Всі запити мають бути з валідним JWT
router.use(authenticate);

// 1. Отримати всі контакти
router.get(
  '/',
  controllerWrapper(getContactsController)
);

// 2. Отримати контакт по id
router.get(
  '/:contactId',
  controllerWrapper(getContactByIdController)
);

// 3. Створити контакт з полем photo
router.post(
  '/',
  upload.single('photo'),
  validateBody(contactCreateSchema),
  controllerWrapper(createContactController)
);

// 4. Оновити контакт (можна оновити й фото)
router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(contactUpdateSchema),
  controllerWrapper(updateContactByIdController)
);

// 5. Видалити контакт
router.delete(
  '/:contactId',
  controllerWrapper(deleteContactByIdController)
);

export default router;
