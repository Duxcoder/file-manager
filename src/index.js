import { homedir } from 'node:os';
import { isValidCommand } from './validation/index.js';
import runCommand from './commands/index.js';
import {
  showInitialMessages,
  showCurrentDirectory,
  showInvalidCommand,
  exitApplication,
} from './utils/index.js';

const initialApplication = () => {
  process.chdir(homedir());
  showInitialMessages();

  process.stdin.on('data', async (chunk) => {
    const input = chunk.toString().trim();
    if (input === '.exit') exitApplication();
    const [command, ...args] = input.split(' ').map((arg) => arg.trim());
    (await isValidCommand(command, args)) ? await runCommand(command, args) : showInvalidCommand();
    showCurrentDirectory();
  });

  process.on('SIGINT', exitApplication);
};

initialApplication();
