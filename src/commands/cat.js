import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

export default async function runCat(path) {
  return new Promise(function (resolvePromise, reject) {
    const stream = createReadStream(resolve(process.cwd(), path));
    stream.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    stream.on('end', resolvePromise);
    stream.on('error', (error) => {
      console.error(`Error reading the file: ${error.message}`);
      reject(error);
    });
  });
}
