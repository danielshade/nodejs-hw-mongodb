import {
  registerService,
  loginService,
  refreshService,
  logoutService,
  sendResetEmailService,
  resetPasswordService
} from '../services/auth.js';

// Controller for user registration
export async function registerController(req, res) {
  const { email, password } = req.body;
  const user = await registerService(email, password);
  res.status(201).json({ status: 201, data: user });
}

// Controller for user login
export async function loginController(req, res) {
  const { email, password } = req.body;
  const tokens = await loginService(email, password);
  res.json({ status: 200, data: tokens });
}

// Controller to refresh access token
export async function refreshController(req, res) {
  const { token } = req.body;
  const newTokens = await refreshService(token);
  res.json({ status: 200, data: newTokens });
}

// Controller to logout user
export async function logoutController(req, res) {
  const { token } = req.body;
  await logoutService(token);
  res.sendStatus(204);
}

// Controller to send reset-password email
export async function sendResetEmailController(req, res) {
  const { email } = req.body;
  await sendResetEmailService(email);
  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {}
  });
}

// Controller to reset user password
export async function resetPwdController(req, res) {
  const { token, password } = req.body;
  await resetPasswordService(token, password);
  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {}
  });
}
