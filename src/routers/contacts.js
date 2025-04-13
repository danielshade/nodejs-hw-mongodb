import express from 'express';
import getAllContacts from '../controllers/getAllContacts.js';
import { getContactByIdController } from '../controllers/getContactById.js';

const router = express.Router();

router.get('/', getAllContactsController);
router.get('/:contactId', getContactByIdController);

export const contactsRouter = router;
