import { createReadStream, createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import { createBrotliDecompress } from 'node:zlib';
import { getNameFile } from '../utils/index.js';

export default async function runDecompress([filePath, savePath]) {
  return new Promise(function (resolvePromise, reject) {
    const readStream = createReadStream(resolve(process.cwd(), filePath));
    const writeStream = createWriteStream(
      resolve(process.cwd(), savePath, getNameFile(filePath).slice(0, -3)),
    );
    const brotli = createBrotliDecompress();
    const stream = readStream.pipe(brotli).pipe(writeStream);
    stream.on('finish', () => {
      console.log('File decompressed successfully ');
      resolvePromise();
    });
    stream.on('error', (error) => {
      console.error(`Error decompress the file: ${error.message}`);
      reject(error);
    });
  });
}
