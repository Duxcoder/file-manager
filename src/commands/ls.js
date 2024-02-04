import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

export default async function runLs() {
  const fileList = [];
  try {
    const files = await readdir(process.cwd());
    if (!files.length) return console.log('Directory is empty');
    for (const file of files) {
      const filePath = resolve(process.cwd(), file);
      const fileStats = await stat(filePath);
      const fileItem = {
        Name: file,
        Type: fileStats.isDirectory() ? 'directory' : 'file',
      };
      fileList.push(fileItem);
    }
  } catch (err) {
    console.error(err);
  }
  console.table(fileList);
}
