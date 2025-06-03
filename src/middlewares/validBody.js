// src/middlewares/validateBody.js
import createHttpError from 'http-errors';

export function validateBody(schema) {
  return async (req, res, next) => {
    try {
      // Виконуємо валідацію тіла запиту (Joi, Yup чи інша бібліотека),
      // передаючи опцію abortEarly:false, щоб зібрати всі помилки одразу.
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      // Якщо валідація провалилася, кидаємо HTTP-400 з детальною інформацією
      const error = createHttpError(400, 'Invalid request body', {
        errors: err.details, // в залежності від Joi це масив обʼєктів з описом помилок
      });
      next(error);
    }
  };
}
