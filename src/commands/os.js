import * as os from 'node:os';
import { OS_ARGS } from '../settings.js';

const showCpus = () => {
  const cpus = os.cpus();
  const CPUS = cpus.length;
  console.log(`All CPUs: ${CPUS}`);
  cpus.forEach((cpu, i) => {
    console.log(`CPU #${i + 1}: model ${cpu.model} with ${cpu.speed} GHz`);
  });
};

export default async function runOs(arg) {
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
}
