import { EOL } from 'node:os';
import { isValidCommand } from './validation/index.js';
import CurrentDirectory from './currentDirectory.js';
import { USERNAME, CMD } from './settings.js';
import {
  runUp,
  runCat,
  runCd,
  runLs,
  runAdd,
  runRn,
  runCp,
  runMv,
  runRm,
  runOs,
  runHash,
  runCompress,
  runDecompress,
} from './commands/index.js';

const currentDirname = new CurrentDirectory();

const showCurrentDirectory = () => {
  console.log(`You are currently in ${currentDirname.get()} ${EOL}`);
};

const initialApplication = () => {
  console.log(`Welcome to the File Manager, ${USERNAME}!`);
  showCurrentDirectory();
};

const showInvalidCommand = () =>
  console.log('Invalid input. Please try to enter the correct command.');

const runCommand = async (command, args) => {
  switch (command) {
    case CMD.up:
      runUp();
      break;
    case CMD.ls:
      await runLs();
      break;
    case CMD.cd:
      runCd(args[0]);
      break;
    case CMD.cat:
      await runCat(args[0]);
      break;
    case CMD.add:
      await runAdd(args[0]);
      break;
    case CMD.rn:
      await runRn(args);
      break;
    case CMD.cp:
      await runCp(args);
      break;
    case CMD.mv:
      await runMv(args);
      break;
    case CMD.rm:
      await runRm(args[0]);
      break;
    case CMD.os:
      await runOs(args[0]);
      break;
    case CMD.hash:
      await runHash(args[0]);
      break;
    case CMD.compress:
      await runCompress(args);
      break;
    case CMD.decompress:
      await runDecompress(args);
      break;
  }
};

process.stdin.on('data', async (chunk) => {
  const input = chunk
    .toString()
    .trim()
    .split(' ')
    .map((arg) => arg.trim());
  const command = input[0];
  const args = input.slice(1);
  (await isValidCommand(command, args)) ? await runCommand(command, args) : showInvalidCommand();
  showCurrentDirectory();
});

process.on('SIGINT', () => {
  console.log(`${EOL} Thank you for using File Manager, ${USERNAME}, goodbye! ${EOL}`);
  process.exit();
});

initialApplication();
