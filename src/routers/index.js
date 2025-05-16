// src/src/routers/index.js
import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';

const router = Router();

// всі запити до /auth обробляє authRouter
router.use('/auth', authRouter);
// всі запити до /contacts обробляє contactsRouter
router.use('/contacts', contactsRouter);

export default router;
