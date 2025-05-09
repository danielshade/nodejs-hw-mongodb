import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { sendResetEmailController, resetPwdController } from '../controllers/authController.js';
import { sendResetEmailSchema, resetPwdSchema } from '../schemas/authSchemas.js';

const router = express.Router();
router.post('/send-reset-email', validateBody(sendResetEmailSchema), sendResetEmailController);
router.post('/reset-pwd', validateBody(resetPwdSchema), resetPwdController);

export default router;
