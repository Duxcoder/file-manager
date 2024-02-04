import { EOL } from 'node:os';
import { USERNAME } from '../settings.js';

export const getNameFile = (path) => path.split('/').at(-1);

export const showCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()} ${EOL}`);
};

export const showInvalidCommand = () =>
  console.log('Invalid input. Please try to enter the correct command.');

export const exitApplication = () => {
  console.log(`${EOL} Thank you for using File Manager, ${USERNAME}, goodbye! ${EOL}`);
  process.exit();
};

export const showInitialMessages = () => {
  console.log(`Welcome to the File Manager, ${USERNAME}!`);
  showCurrentDirectory();
};
