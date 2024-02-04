import { readdir, stat, writeFile, rename } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import CurrentDirectory from '../currentDirectory.js';

const currentDirname = new CurrentDirectory();

export const runUp = () => currentDirname.set(dirname(currentDirname.get()));
export const runCd = (path) => currentDirname.set(resolve(currentDirname.get(), path));
