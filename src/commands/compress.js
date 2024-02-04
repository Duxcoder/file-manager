import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { createBrotliCompress } from 'node:zlib';
import { getNameFile } from '../utils/index.js';

export default async function runCompress([filePath, savePath]) {
  return new Promise(function (resolvePromise, reject) {
    const readStream = createReadStream(resolve(process.cwd(), filePath));
    const writeStream = createWriteStream(
      resolve(process.cwd(), savePath, `${getNameFile(filePath)}.br`),
    );
    const brotli = createBrotliCompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);
    stream.on('finish', () => {
      console.log('File compressed successfully ');
      resolvePromise();
    });
    stream.on('error', (error) => {
      console.error(`Error compress the file: ${error.message}`);
      reject(error);
    });
  });
}
