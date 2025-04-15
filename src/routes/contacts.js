import express from 'express';
import getAllContacts from '../controllers/getAllContacts.js';
import getContactById from '../controllers/getContactById.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById); 

export default router;
