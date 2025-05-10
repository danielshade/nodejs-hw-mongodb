// src/middlewares/authenticate.js
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { UsersCollection } from '../db/models/user.js';

export async function authenticate(req, res, next) {
  try {
    // 1) Дістаємо токен з заголовка
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createHttpError(401, 'Not authorized');
    }

    // 2) Перевіряємо формат "Bearer <token>"
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw createHttpError(401, 'Not authorized');
    }

    // 3) Верифікація accessToken за JWT_SECRET
    const payload = jwt.verify(token, getEnvVar('JWT_SECRET'));

    // 4) Знаходимо юзера в БД
    const user = await UsersCollection.findById(payload.id);
    if (!user) {
      throw createHttpError(401, 'Not authorized');
    }

    // 5) Прикріплюємо юзера до запиту
    req.user = user;
    next();
  } catch (err) {
    // якщо JWT не валідний або будь-яка інша помилка
    next(err);
  }
}
