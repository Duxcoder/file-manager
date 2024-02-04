import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import CurrentDirectory from '../currentDirectory.js';
import { CMD, OS_ARGS } from '../settings.js';

const isValidPaths = async (paths, options) => {
  if (paths.length !== options.length) return false;
  const results = await Promise.all(
    paths.map(async (path, i) => {
      if (!options[i].exist) return true;
      return await isValidPath(path, options[i]);
    }),
  );
  const result = results.every((value) => value);

  return result;
};

const isFile = (directory, stats, path) => {
  const res = !directory && stats.isFile();
  if (!res) console.log(`This is not a file path: ${path}`);
  return res;
};

const isDirectory = (directory, stats, path) => {
  const res = directory && stats.isDirectory();
  if (!res) console.log(`This is not a directory path: ${path}`);
  return res;
};

const isValidPath = async (path, { exist = true, directory = null } = {}) => {
  try {
    const currentDirname = new CurrentDirectory();
    const stats = await stat(resolve(currentDirname.get(), path));
    let valid = true;
    if (directory !== null) {
      const args = [directory, stats, path];
      valid = directory ? isDirectory(...args) : isFile(...args);
    }
    return valid;
  } catch (er) {
    if (er.code === 'ENOENT') {
      exist && console.log(`this path is not exist: ${path}`);
      return false;
    }
    console.log(er.message);
    return false;
  }
};

const isValidOsArg = async (args) => {
  if (args.length !== 1) return false;
  const [arg] = args;
  if (!Object.values(OS_ARGS).includes(arg)) return false;
  return true;
};

export const isValidCommand = async (command, args) => {
  const commands = Object.values(CMD);
  if (!commands.includes(command)) return false;
  switch (command) {
    case CMD.up:
      return !args.length;
    case CMD.ls:
      return !args.length;
    case CMD.cd:
      return await isValidPaths(args, [{ exist: true, directory: true }]);
    case CMD.cat:
      return await isValidPaths(args, [{ exist: true, directory: false }]);
    case CMD.add:
      return await isValidPaths(args, [{ exist: false, directory: false }]);
    case CMD.rn:
      return await isValidPaths(args, [{ exist: true }, { exist: false }]);
    case CMD.cp:
      return await isValidPaths(args, [
        { exist: true, directory: false },
        { exist: true, directory: true },
      ]);
    case CMD.mv:
      return await isValidPaths(args, [
        { exist: true, directory: false },
        { exist: true, directory: true },
      ]);
    case CMD.rm:
      return await isValidPaths(args, [{ exist: true, directory: false }]);
    case CMD.os:
      return await isValidOsArg(args);
    case CMD.hash:
      return await isValidPaths(args, [{ exist: true, directory: false }]);
    case CMD.compress:
      return await isValidPaths(args, [
        { exist: true, directory: false },
        { exist: true, directory: true },
      ]);
    case CMD.decompress:
      return await isValidPaths(args, [
        { exist: true, directory: false },
        { exist: true, directory: true },
      ]);
  }
};
