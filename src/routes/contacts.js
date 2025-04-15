import express from 'express';
import { getAllContacts } from '../controllers/getAllContacts.js';

const router = express.Router();

router.get('/', getAllContacts); // /contacts

export default router;
