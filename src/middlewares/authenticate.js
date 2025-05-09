import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { getEnvVar } from '../utils/getEnvVar.js';
import { UsersCollection } from '../db/models/user.js';

const JWT_SECRET = getEnvVar('JWT_SECRET');

export async function authenticate(req, res, next) {
  const auth = req.headers.authorization || '';
  const [bearer, token] = auth.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Not authorized'));
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return next(createHttpError(401, 'Token is expired or invalid.'));
  }
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    return next(createHttpError(401, 'Not authorized'));
  }
  req.user = user;
  next();
}
