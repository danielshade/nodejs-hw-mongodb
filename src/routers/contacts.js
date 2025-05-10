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
  deleteContactByIdController,
} from '../controllers/contacts.js';

const router = express.Router();

// Усі запити мають пройти через authenticate
router.use(authenticate);

// Отримати всі контакти
router.get('/', controllerWrapper(getContactsController));

// Отримати контакт за ID
router.get('/:contactId', controllerWrapper(getContactByIdController));

// Створити контакт з підтримкою upload.single('photo')
router.post(
  '/',
  upload.single('photo'),
  validateBody(contactCreateSchema),
  controllerWrapper(createContactController),
);

// Оновити контакт (і фото, якщо завантажили)
router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(contactUpdateSchema),
  controllerWrapper(updateContactByIdController),
);

// Видалити контакт
router.delete('/:contactId', controllerWrapper(deleteContactByIdController));

export default router;
