import express from 'express';
const router = express.Router();

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

router.get('/', getAllContactsController);
router.get('/:contactId', getContactByIdController);
router.post('/', createContactController);
router.put('/:contactId', updateContactController);
router.delete('/:contactId', deleteContactController);
export default router;

