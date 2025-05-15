// простий хелпер, щоб кидати зрозумілу помилку, якщо чогось не вистачає
export function getEnvVar(key) {
  const val = process.env[key];
  if (!val) {
    throw new Error(`Missing: process.env['${key}'].`);
  }
  return val;
}
