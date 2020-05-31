import fs from 'fs';

function readFile (path: Buffer | URL | string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
  return new Promise(($, $$) => {
    const readableStream = fs.createReadStream(path, { encoding, });

    let data: string = '';

    readableStream.on('data', (chunk) => data += chunk);

    readableStream.on('end', () => $(data));

    readableStream.on('error', () => $$(new Error(`The file "${path}" does not exist.`)));
  });
}

export default readFile;
