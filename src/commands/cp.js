import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { getNameFile } from '../utils/index.js';

export default async function runCp([pathFile, pathDir], showConsole = true) {
  return new Promise(function (resolvePromise, reject) {
    const readStream = createReadStream(resolve(process.cwd(), pathFile));
    const writeStream = createWriteStream(
      resolve(process.cwd(), pathDir, getNameFile(readStream.path)),
    );
    readStream.on('data', (chunk) => {
      writeStream.write(chunk);
    });
    readStream.on('end', () => {
      showConsole && console.log('File copied successfully');
      resolvePromise();
    });
    readStream.on('error', (error) => {
      console.error(`Error copy the file: ${error.message}`);
      reject(error);
    });
  });
}
