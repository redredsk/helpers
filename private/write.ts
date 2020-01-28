import fs from 'fs';

function write (path: Buffer | URL | string, $: string, encoding = 'utf8'): void {
  const writableStream = fs.createWriteStream(path, { encoding, });

  writableStream.end($, encoding);
}

export default write;
