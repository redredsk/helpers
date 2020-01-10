import fs from 'fs';

/**
 * await read(path);
 */
function read(path: string): Promise<string> {
  return new Promise(($, $$) => {
    const readableStream = fs.createReadStream(path);

    let dataBefore: Array<Buffer> = [];

    readableStream.on('data', (data) => {
      dataBefore = [
        ...dataBefore,
        data,
      ];
    });

    readableStream.on('end', () => {
      const dataAfter = Buffer.concat(dataBefore).toString();

      $(dataAfter);
    });

    readableStream.on('error', (error) => {
      $$(error);
    });
  });
}

export default read;
