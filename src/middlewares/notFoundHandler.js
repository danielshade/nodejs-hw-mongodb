
 // src/middlewares/notFoundHandler.js
import createHttpError from 'http-errors';

// Тепер це default-експорт:
export default function notFoundHandler(req, res, next) {
  next(createHttpError(404, 'Not found'));
}
