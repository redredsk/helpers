import fs from 'fs';

function write(path: string, $: string): void {
  const writableStream = fs.createWriteStream(path);

  writableStream.end($);
}

export default write;
