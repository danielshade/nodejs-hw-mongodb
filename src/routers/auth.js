import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { sendResetEmail, resetPassword } from '../controllers/authController.js';
import { sendResetEmailSchema, resetPwdSchema } from '../schemas/authSchemas.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = express.Router();

router.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  sendResetEmail
);

router.post(
  '/reset-pwd',
  validateBody(resetPwdSchema),
  resetPassword
);

export default router;
