// src/routers/auth.js
import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import { controllerWrapper } from '../utils/controllerWrapper.js';
import {
  registerUserController,
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

const router = Router();

// реєстрація
router.post(
  '/register',
  validateBody(registerUserSchema),
  controllerWrapper(registerUserController)
);

// логін
router.post(
  '/login',
  validateBody(loginUserSchema),
  controllerWrapper(loginUserController)
);

// оновити токен
router.post(
  '/refresh',
  controllerWrapper(refreshTokenController)
);

// вийти (видалити refresh token)
router.post(
  '/logout',
  controllerWrapper(logoutUserController)
);

// відправити лінк для скидання пароля
router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  controllerWrapper(requestResetEmailController)
);

// скинути пароль
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  controllerWrapper(resetPasswordController)
);

export default router;
