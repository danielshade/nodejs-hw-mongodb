import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { UsersCollection } from '../db/models/user.js';

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createHttpError(401, 'Not authorized');

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) throw createHttpError(401, 'Not authorized');

    const payload = jwt.verify(token, getEnvVar('JWT_SECRET'));
    const user = await UsersCollection.findById(payload.id);
    if (!user) throw createHttpError(401, 'Not authorized');

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
