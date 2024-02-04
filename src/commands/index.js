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
export const runCat = async (path) => {
  return new Promise(function (resolvePromise, reject) {
    const stream = createReadStream(resolve(currentDirname.get(), path));
    stream.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    stream.on('end', resolvePromise);
    stream.on('error', () => {
      console.error(`Error reading the file: ${error.message}`);
      reject(error);
    });
  });
};
export const runAdd = async (path) => {
  await writeFile(resolve(currentDirname.get(), path), '', { flag: 'ax+' });
};
export const runRn = async ([oldPath, newPath]) => {
  const oldName = resolve(currentDirname.get(), oldPath);
  const newName = resolve(currentDirname.get(), newPath);
  await rename(oldName, newName);
  console.log('file renamed successfully');
};
