import fs from 'fs';

function writeFile (path: Buffer | URL | string, data: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
  return new Promise(($, $$) => {
    fs.writeFile(path, data, { encoding, }, (error) => error ? $$(error) : $(data));
  });
}

export default writeFile;
