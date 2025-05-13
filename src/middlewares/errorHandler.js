// src/middlewares/errorHandler.js
import { HttpError } from 'http-errors';

export default function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
}
