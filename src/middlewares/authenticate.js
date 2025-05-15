// src/middlewares/authenticate.js
export function authenticate(req, res, next) {
  // приклад: перевіряємо наявність токена в заголовку
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Missing auth token',
      data: {}
    });
  }

  // тут ваша логіка верифікації токена…
  // наприклад, jwt.verify(token, SECRET)

  // якщо усе гаразд:
  next();
}
