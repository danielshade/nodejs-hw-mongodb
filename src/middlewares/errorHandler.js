import { HttpError } from 'http-errors';

export default function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    status: 'error',
    code: status,
    message: err.message || 'Internal Server Error',
    ...(err.errors ? { errors: err.errors } : {}),
  });
}

