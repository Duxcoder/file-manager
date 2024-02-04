import { CMD } from '../settings.js';
import runUp from './up.js';
import runLs from './ls.js';
import runCd from './cd.js';
import runCat from './cat.js';
import runAdd from './add.js';
import runRn from './rn.js';
import runCp from './cp.js';
import runMv from './mv.js';
import runRm from './rm.js';
import runOs from './os.js';
import runHash from './hash.js';
import runCompress from './compress.js';
import runDecompress from './decompress.js';

export default async function runCommand(command, args) {
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
}
