import { homedir } from 'node:os';

export default class CurrentDirectory {
  constructor() {
    if (!CurrentDirectory.instance) {
      this.data = homedir();
      CurrentDirectory.instance = this;
    }
    return CurrentDirectory.instance;
  }

  get() {
    return this.data;
  }

  set(directory) {
    this.data = directory;
  }
}
