import getContactById from '../controllers/getContactById.js';

import express from 'express';
import getAllContacts from '../controllers/getAllContacts.js';
import { getContactByIdController } from '../controllers/getContactById.js';

const router = express.Router();

router.get('/', getAllContactsController);
router.get('/:contactId', getContactByIdController);
router.get('/:contactId', getContactById);


export const contactsRouter = router;
