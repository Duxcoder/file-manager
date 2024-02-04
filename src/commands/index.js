import { readdir, stat, writeFile, rename } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import CurrentDirectory from '../currentDirectory.js';

const currentDirname = new CurrentDirectory();

export const runUp = () => currentDirname.set(dirname(currentDirname.get()));
export const runCd = (path) => currentDirname.set(resolve(currentDirname.get(), path));
export const runLs = async () => {
  const fileList = [];
  try {
    const files = await readdir(currentDirname.get());

    for (const file of files) {
      const filePath = resolve(currentDirname.get(), file);
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
};
