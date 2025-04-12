import { Router } from 'express';
import { sendResetEmailController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { sendResetEmailSchema } from '../validations/authSchemas.js';

const router = Router();

router.post('/send-reset-email', validateBody(sendResetEmailSchema), sendResetEmailController);

export default router;

