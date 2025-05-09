import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name) {
  const val = process.env[name];
  if (!val) throw new Error(`Missing: process.env['${name}'].`);
  return val;
}
