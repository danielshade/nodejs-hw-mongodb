// src/routers/auth.js
import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  requestResetEmailController,
  resetPasswordController,
  userRegisterController,
} from '../controllers/authController.js';

const authRouter = Router();

// POST /auth/register
authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWrapper(userRegisterController)
);

// POST /auth/login
authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWrapper(loginUserController)
);

// POST /auth/refresh
authRouter.post('/refresh', controllerWrapper(refreshTokenController));

// POST /auth/logout
authRouter.post('/logout', controllerWrapper(logoutUserController));

// POST /auth/send-reset-email
authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  controllerWrapper(requestResetEmailController)
);

// POST /auth/reset-pwd
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  controllerWrapper(resetPasswordController)
);

export default authRouter;
