import { sendResetEmailService, resetPasswordService } from '../services/auth.js';

export async function sendResetEmailController(req, res) {
  await sendResetEmailService(req.body.email);
  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
}

export async function resetPwdController(req, res) {
  const { token, password } = req.body;
  await resetPasswordService(token, password);
  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
}
