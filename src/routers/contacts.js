
import express from 'express';
import getAllContacts from '../controllers/getAllContacts.js';
import getContactById from '../controllers/getContactById.js';


const router = express.Router();

router.get('/', getAllContactsController);
router.get('/:contactId', getContactByIdController);
router.get('/:contactId', getContactById);


export const contactsRouter = router;
