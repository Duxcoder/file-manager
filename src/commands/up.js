import { dirname } from 'node:path';

export default function runUp() {
  process.chdir(dirname(process.cwd()));
}
