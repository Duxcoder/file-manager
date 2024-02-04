import * as os from 'node:os';
import { createHash } from 'node:crypto';
import { readdir, stat, writeFile, rename, rm } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createBrotliCompress } from 'node:zlib';
import CurrentDirectory from '../currentDirectory.js';
import { OS_ARGS } from '../settings.js';

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
    stream.on('error', (error) => {
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
export const runCp = async ([pathFile, pathDir]) => {
  const readStream = createReadStream(resolve(currentDirname.get(), pathFile));
  const writeStream = createWriteStream(resolve(currentDirname.get(), pathDir, pathFile));
  readStream.on('data', (chunk) => {
    writeStream.write(chunk);
  });
  writeStream.end();
};
export const runRm = async (path) => {
  await rm(resolve(currentDirname.get(), path));
};
export const runMv = async ([pathFile, pathDir]) => {
  await runCp([pathFile, pathDir]);
  await runRm(pathFile);
};
const showCpus = () => {
  const cpus = os.cpus();
  const CPUS = cpus.length;
  console.log(`All CPUs: ${CPUS}`);
  cpus.forEach((cpu, i) => {
    console.log(`CPU #${i + 1}: model ${cpu.model} with ${cpu.speed} GHz`);
  });
};
export const runOs = async (arg) => {
  switch (arg) {
    case OS_ARGS.eol:
      console.log(`EOL: ${os.EOL}`);
      break;
    case OS_ARGS.cpus:
      showCpus();
      break;
    case OS_ARGS.homedir:
      console.log(`Homedir: ${os.homedir()}`);
      break;
    case OS_ARGS.username:
      console.log(`Username: ${os.userInfo().username}`);
      break;
    case OS_ARGS.architecture:
      console.log(`Architecture: ${os.arch()}`);
      break;
  }
};
export const runHash = async (path) => {
  return new Promise(function (resolvePromise, reject) {
    const readableStream = createReadStream(resolve(currentDirname.get(), path));
    readableStream.on('data', async (chunk) => {
      console.log(await createHash('sha256').update(chunk).digest('hex'));
    });
    readableStream.on('end', resolvePromise);
    readableStream.on('error', (error) => {
      console.error(`Error hash the file: ${error.message}`);
      reject(error);
    });
  });
};

export const runCompress = async ([filePath, savePath]) => {
  return new Promise(function (resolvePromise, reject) {
    const readStream = createReadStream(resolve(currentDirname.get(), filePath));
    const writeStream = createWriteStream(
      resolve(currentDirname.get(), savePath, `${filePath}.br`),
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
};
