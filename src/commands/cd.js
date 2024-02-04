import { resolve } from 'node:path';

export default function runCd(path) {
  process.chdir(resolve(process.cwd(), path));
}
