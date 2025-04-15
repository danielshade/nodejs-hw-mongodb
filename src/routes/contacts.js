import express from 'express';
import getAllContacts from '../controllers/getAllContacts.js'; // ❗ важливо — має бути default export

const router = express.Router();

router.get('/', getAllContacts);

export default router;
