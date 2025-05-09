import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { UsersCollection } from '../db/models/user.js';
import { sendMail } from './emailService.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');
const APP_DOMAIN = getEnvVar('APP_DOMAIN').replace(/\/$/, '');

export async function sendResetEmailService(email) {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5m' });
  const link = `${APP_DOMAIN}/reset-password?token=${token}`;
  try {
    await sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<p>To reset your password, click <a href="${link}">here</a>.</p>`,
    });
  } catch {
    throw createHttpError(500, 'Failed to send the email, please try again later.');
  }
}

export async function resetPasswordService(token, password) {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found!');
  user.setPassword(password);
  await user.save();
}
