import express from 'express';
import getAllContacts from '../controllers/getAllContacts.js';
import getContactById from '../controllers/getContactById.js';
import addContact from '../controllers/addContact.js';

const router = express.Router();

router.get('/', getAllContacts); // GET all
router.get('/:contactId', getContactById); // ✅ GET by id з data
router.post('/', addContact); // POST

export default router;
