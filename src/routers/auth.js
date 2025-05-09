import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  registerSchema, loginSchema, tokenSchema,
  sendResetEmailSchema, resetPwdSchema
} from '../schemas/authSchemas.js';
import {
  registerController, loginController,
  refreshController, logoutController,
  sendResetEmailController, resetPwdController
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register',      validateBody(registerSchema),   registerController);
router.post('/login',         validateBody(loginSchema),      loginController);
router.post('/refresh',       validateBody(tokenSchema),      refreshController);
router.post('/logout',        validateBody(tokenSchema),      logoutController);

router.post('/send-reset-email', validateBody(sendResetEmailSchema), sendResetEmailController);
router.post('/reset-pwd',        validateBody(resetPwdSchema),      resetPwdController);

export default router;
