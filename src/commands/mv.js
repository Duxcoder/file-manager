import runCp from './cp.js';
import runRm from './rm.js';

export default async function runMv([pathFile, pathDir]) {
  try {
    await runCp([pathFile, pathDir], false);
    await runRm(pathFile, false);
    console.log(`File ${pathFile} moved to ${pathDir}`);
  } catch (error) {
    console.error(`Error move the file: ${error.message}`);
  }
}
