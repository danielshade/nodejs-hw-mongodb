// src/routers/contacts.js
import { Router } from 'express';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';

const contactsRouter = Router();

// all /contacts/* routes require authentication
contactsRouter.use(authenticate);

contactsRouter
  .route('/')
  .get(controllerWrapper(getAllContacts))
  .post(validateBody(), controllerWrapper(createContact));

contactsRouter
  .route('/:id')
  .get(controllerWrapper(getContactById))
  .patch(validateBody(), controllerWrapper(updateContact))
  .delete(controllerWrapper(deleteContact));

export default contactsRouter;
