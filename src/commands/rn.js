import { rename } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async function runRn([oldPath, newPath]) {
  try {
    const oldName = resolve(process.cwd(), oldPath);
    const newName = resolve(process.cwd(), newPath);
    await rename(oldName, newName);
    console.log('file renamed successfully');
  } catch (error) {
    console.error(`Error rename the file: ${error.message}`);
  }
}
