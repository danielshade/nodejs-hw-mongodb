import {
  registerService,
  loginService,
  refreshService,
  logoutService,
  sendResetEmailService,
  resetPasswordService
} from '../services/auth.js';


export async function registerController(req, res) {
  const { email, password } = req.body;
  const user = await registerService(email, password);
  res.status(201).json({ status: 201, data: user });
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  const tokens = await loginService(email, password);
  res.json({ status: 200, data: tokens });
}

export async function refreshController(req, res) {
  const { token } = req.body;
  const newTokens = await refreshService(token);
  res.json({ status: 200, data: newTokens });
}

export async function logoutController(req, res) {
  const { token } = req.body;
  await logoutService(token);
  res.sendStatus(204);
}

