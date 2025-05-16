// src/routers/contacts.js
import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  deleteContactByIdController,
} from '../controllers/contacts.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import authenticate from '../middlewares/authenticate.js';
import isValidId from '../middlewares/isValidId.js';
import upload from '../middlewares/multer.js';

export const contactsRouter = Router();

// GET /contacts
contactsRouter.get(
  '/',
  authenticate,
  controllerWrapper(getContactsController),
);

// GET /contacts/:contactId
contactsRouter.get(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWrapper(getContactByIdController),
);

// POST /contacts
contactsRouter.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createContactSchema),
  controllerWrapper(createContactController),
);

// PATCH /contacts/:contactId
contactsRouter.patch(
  '/:contactId',
  authenticate,
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  controllerWrapper(updateContactByIdController),
);

// DELETE /contacts/:contactId
contactsRouter.delete(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWrapper(deleteContactByIdController),
);
