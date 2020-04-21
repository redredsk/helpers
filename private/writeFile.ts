import fs from 'fs';

function writeFile(path: Buffer | URL | string, data: string): void {
  const writableStream = fs.createWriteStream(path);

  writableStream.end(data);
}

export default writeFile;
