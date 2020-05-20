import fs from 'fs';

function writeFile (path: Buffer | URL | string, data: any): void {
  const writableStream = fs.createWriteStream(path);

  writableStream.end(data);
}

export default writeFile;
