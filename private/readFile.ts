import fs from 'fs';

function readFile (path: Buffer | URL | string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
  return new Promise(($, $$) => {
    fs.readFile(path, { encoding, }, (error, data) => error ? $$(error) : $(data));
  });
}

export default readFile;
