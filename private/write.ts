import fs from 'fs';

function write(path: Buffer | URL | string, $: string): void {
  const writableStream = fs.createWriteStream(path);

  writableStream.end($);
}

export default write;
