import express from 'express';
import { registerController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema } from '../validations/authSchemas.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), registerController);

export default router;
