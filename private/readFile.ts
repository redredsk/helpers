import fs from 'fs';

function readFile(path: Buffer | URL | string, encoding = 'utf8'): Promise<string> {
  return new Promise(($, $$) => {
    const readableStream = fs.createReadStream(path);

    let dataBefore: Array<Buffer> = [];

    readableStream.on('data', (data) => {
      dataBefore = [...dataBefore, data];
    });

    readableStream.on('end', () => {
      const dataAfter = Buffer.concat(dataBefore).toString(encoding);

      $(dataAfter);
    });

    readableStream.on('error', (error) => $$(error));
  });
}

export default readFile;
