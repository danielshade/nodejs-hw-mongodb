import { Router } from 'express';

import {
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  postContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

router.post('/contacts', ctrlWrapper(postContactController));

router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
