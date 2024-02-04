import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async function runRm(path, showConsole = true) {
  try {
    await rm(resolve(process.cwd(), path));
    showConsole && console.log('File deleted successfully');
  } catch (error) {
    console.error(`Error delete the file: ${error.message}`);
  }
}
