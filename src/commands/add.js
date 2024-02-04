import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async function runAdd(path) {
  try {
    await writeFile(resolve(process.cwd(), path), '', { flag: 'ax+' });
    console.log('file created successfully');
  } catch (error) {
    console.error(`Error create the file: ${error.message}`);
  }
}
