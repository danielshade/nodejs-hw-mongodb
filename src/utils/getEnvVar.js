import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
<<<<<<< HEAD
}
=======
}
>>>>>>> 9fd3b270f1ba0c3fe29369c19336d5570004c794
