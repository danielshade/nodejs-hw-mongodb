// src/routers/auth.js
import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import controllerWrapper from '../utils/controllerWrapper.js';

import {
  userRegisterController,
  loginUserController,
  refreshTokenController,
  logoutUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWrapper(userRegisterController),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWrapper(loginUserController),
);

authRouter.post(
  '/refresh',
  controllerWrapper(refreshTokenController),
);

authRouter.post(
  '/logout',
  controllerWrapper(logoutUserController),
);

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  controllerWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  controllerWrapper(resetPasswordController),
);

export default authRouter;
