import fs from 'node:fs/promises';
import path from 'node:path';

export default async function createDirIfNotExists(dirPath) {
  try {
    await fs.access(dirPath);
    // якщо досяжна — нічого не робимо
  } catch (_) {
    // якщо нема, створюємо рекурсивно
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`📁 Directory created: ${dirPath}`);
  }
}
