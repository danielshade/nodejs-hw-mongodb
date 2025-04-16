import express from 'express';
import getAllContacts from '../controllers/getAllContacts.js';
import addContact from '../controllers/addContact.js'; // додали

const router = express.Router();

router.get('/', getAllContacts);
router.post('/', addContact); // новий маршрут

export default router;
