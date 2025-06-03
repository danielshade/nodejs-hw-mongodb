// src/middlewares/validateBody.js
import createHttpError from 'http-errors';

/**
 *  validateBody(schema)
 *  - schema: Joi or any object with .validateAsync() API
 */
export default function validateBody(schema) {
  return async (req, res, next) => {
    try {
      // if no schema provided, just pass through
      if (!schema) {
        return next();
      }
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      const error = createHttpError(400, 'No valid body', {
        errors: err.details || err,
      });
      next(error);
    }
  };
}
