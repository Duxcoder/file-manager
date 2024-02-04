import * as os from 'node:os';
import { createHash } from 'node:crypto';
import { readdir, stat, writeFile, rename, rm } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { OS_ARGS } from '../settings.js';
import { getNameFile } from '../utils/index.js';
export const runUp = () => process.chdir(dirname(process.cwd()));

export const runCd = (path) => process.chdir(resolve(process.cwd(), path));

export const runLs = async () => {
  const fileList = [];
  try {
    const files = await readdir(process.cwd());

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
};

export const runCat = async (path) => {
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
};

export const runAdd = async (path) => {
  try {
    await writeFile(resolve(process.cwd(), path), '', { flag: 'ax+' });
    console.log('file created successfully');
  } catch (error) {
    console.error(`Error create the file: ${error.message}`);
  }
};

export const runRn = async ([oldPath, newPath]) => {
  try {
    const oldName = resolve(process.cwd(), oldPath);
    const newName = resolve(process.cwd(), newPath);
    await rename(oldName, newName);
    console.log('file renamed successfully');
  } catch (error) {
    console.error(`Error rename the file: ${error.message}`);
  }
};

export const runCp = async ([pathFile, pathDir], showConsole = true) => {
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
};

export const runRm = async (path, showConsole = true) => {
  try {
    await rm(resolve(process.cwd(), path));
    showConsole && console.log('File deleted successfully');
  } catch (error) {
    console.error(`Error delete the file: ${error.message}`);
  }
};

export const runMv = async ([pathFile, pathDir]) => {
  try {
    await runCp([pathFile, pathDir], false);
    await runRm(pathFile, false);
    console.log(`File ${pathFile} moved to ${pathDir}`);
  } catch (error) {
    console.error(`Error move the file: ${error.message}`);
  }
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
};

export const runCompress = async ([filePath, savePath]) => {
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
};

export const runDecompress = async ([filePath, savePath]) => {
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
};
