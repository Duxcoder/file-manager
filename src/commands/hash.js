import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

export default async function runHash(path) {
  return new Promise(function (resolvePromise, reject) {
    const readableStream = createReadStream(resolve(process.cwd(), path));
    readableStream.on('data', async (chunk) => {
      console.log(await createHash('sha256').update(chunk).digest('hex'));
    });
    readableStream.on('end', resolvePromise);
    readableStream.on('error', (error) => {
      console.error(`Error hash the file: ${error.message}`);
      reject(error);
    });
  });
}
