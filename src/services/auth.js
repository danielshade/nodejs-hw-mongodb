// src/services/auth.js
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { UsersCollection } from '../db/models/user.js';
import { sendMail } from './emailService.js';

const JWT_SECRET     = getEnvVar('JWT_SECRET');
const REFRESH_SECRET = getEnvVar('REFRESH_SECRET');
const ACCESS_TTL     = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TTL    = process.env.REFRESH_TOKEN_TTL || '7d';
const APP_DOMAIN     = getEnvVar('APP_DOMAIN').replace(/\/$/, '');

// --- REGISTER ---
export async function registerService(email, password) {
  const exists = await UsersCollection.findOne({ email });
  if (exists) throw createHttpError(409, 'Email in use');
  const user = new UsersCollection({ email });
  user.setPassword(password);
  await user.save();
  return { email: user.email, id: user._id };
}

// --- LOGIN ---
export async function loginService(email, password) {
  const user = await UsersCollection.findOne({ email });
  if (!user || !user.isValidPassword(password)) {
    throw createHttpError(401, 'Email or password is wrong');
  }
  const payload       = { id: user._id };
  const accessToken   = jwt.sign(payload, JWT_SECRET,    { expiresIn: ACCESS_TTL });
  const refreshToken  = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
  user.token = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
}

// --- REFRESH ---
export async function refreshService(token) {
  let payload;
  try {
    payload = jwt.verify(token, REFRESH_SECRET);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }
  const user = await UsersCollection.findOne({ _id: payload.id, token });
  if (!user) throw createHttpError(401, 'Not authorized');
  const newAccessToken = jwt.sign({ id: payload.id }, JWT_SECRET, { expiresIn: ACCESS_TTL });
  return { accessToken: newAccessToken };
}

// --- LOGOUT ---
export async function logoutService(token) {
  const user = await UsersCollection.findOne({ token });
  if (!user) return;
  user.token = null;
  await user.save();
}

// --- SEND RESET EMAIL ---
export async function sendResetEmailService(email) {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5m' });
  const link  = `${APP_DOMAIN}/reset-password?token=${token}`;

  try {
    await sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    });
  } catch (err) {
    throw createHttpError(500, 'Failed to send the email, please try again later.');
  }
}

// --- RESET PASSWORD ---
export async function resetPasswordService(token, newPassword) {
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found!');
  user.setPassword(newPassword);
  // clear old refresh token on password change
  user.token = null;
  await user.save();
}
