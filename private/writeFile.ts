import fs from 'fs';

function writeFile (path: Buffer | URL | string, data: any, encoding: BufferEncoding = 'utf-8'): void {
  const writableStream = fs.createWriteStream(path, { encoding, });

  writableStream.end(data);
}

export default writeFile;
