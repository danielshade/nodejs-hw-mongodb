import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendMail } from '../services/emailService.js';
import { UsersCollection } from '../db/models/user.js'; // або як у вас

const JWT_SECRET = getEnvVar('JWT_SECRET');
const APP_DOMAIN = getEnvVar('APP_DOMAIN').replace(/\/$/, '');

export const sendResetEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found!');

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5m' });
  const link  = `${APP_DOMAIN}/reset-password?token=${token}`;

  try {
    await sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Щоб скинути пароль, перейдіть за <a href="${link}">посиланням</a>.</p>`,
    });
  } catch (err) {
    throw createHttpError(500, 'Failed to send the email, please try again later.');
  }

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found!');

  user.password = await user.hashPassword(password); // або bcrypt.hash
  await user.save();

  // приклад, якщо ви зберігаєте сесії в окремій колекції
  // await SessionsCollection.deleteMany({ userId: user._id });

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
