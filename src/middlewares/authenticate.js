// src/middlewares/authenticate.js
import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

/**
 * Перевіряє наявність та валідність Bearer-токена,
 * підтягує сесію й юзера, кидає помилку 401, якщо щось не так.
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw createHttpError(401, 'Please provide Authorization header');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw createHttpError(401, 'Auth header must be "Bearer <token>"');
    }

    const session = await SessionsCollection.findOne({ accessToken: token });
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    if (new Date() > new Date(session.accessTokenValidUntil)) {
      throw createHttpError(401, 'Access token expired');
    }

    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    // передаємо знайденого користувача далі в роутах
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
