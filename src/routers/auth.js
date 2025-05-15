// src/routers/auth.js
import { Router }                              from 'express';
import { controllerWrapper }                   from '../utils/controllerWrapper.js';
import { validateBody }                        from '../middlewares/validateBody.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  userRegisterController,
  loginUserController,
  refreshTokenController,
  logoutUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWrapper(userRegisterController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWrapper(loginUserController),
);

router.post(
  '/refresh',
  controllerWrapper(refreshTokenController),
);

router.post(
  '/logout',
  controllerWrapper(logoutUserController),
);

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  controllerWrapper(requestResetEmailController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  controllerWrapper(resetPasswordController),
);

export default router;
