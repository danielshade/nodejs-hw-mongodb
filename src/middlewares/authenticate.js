// src/middlewares/authenticate.js
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');

/**
 *  authenticate(req, res, next)
 *  - looks for Authorization: Bearer <token>
 *  - verifies JWT_SECRET
 *  - attaches user payload to req.user
 */
export default async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw createHttpError(401, 'Authorization header missing');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw createHttpError(401, 'Invalid authorization format');
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // e.g. { id: ..., email: ... }
    next();
  } catch (err) {
    next(createHttpError(401, 'Not authorized'));
  }
}
