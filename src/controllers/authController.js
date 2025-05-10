import {
  registerService,
  loginService,
  refreshService,
  logoutService,
  sendResetEmailService,
  resetPasswordService
} from '../services/auth.js';

const COOKIE_OPTS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'None',
  maxAge:   1000 * 60 * 60 * 24 * 7  // 7 днів
};

export async function registerController(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await registerService(email, password);
    res.status(201).json({ status: 201, data: user });
  } catch (err) { next(err) }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await loginService(email, password);
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({ status: 200, data: { accessToken } });
  } catch (err) { next(err) }
}

export async function refreshController(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { accessToken } = await refreshService(refreshToken);
    // оновлювати куку не обов’язково, але можна:
    res.cookie('refreshToken', refreshToken, COOKIE_OPTS);
    res.json({ status: 200, data: { accessToken } });
  } catch (err) { next(err) }
}

export async function logoutController(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    await logoutService(refreshToken);
    res.clearCookie('refreshToken', COOKIE_OPTS);
    res.sendStatus(204);
  } catch (err) { next(err) }
}

export async function sendResetEmailController(req, res, next) {
  try {
    const { email } = req.body;
    await sendResetEmailService(email);
    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {}
    });
  } catch (err) { next(err) }
}

export async function resetPwdController(req, res, next) {
  try {
    const { token, password } = req.body;
    await resetPasswordService(token, password);
    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {}
    });
  } catch (err) { next(err) }
}
