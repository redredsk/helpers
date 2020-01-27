import fs from 'fs';

type Flags = 'a' | 'a+' | 'as' | 'as+' | 'ax' | 'ax+' | 'r' | 'r+' | 'rs' | 'rs+' | 'sa' | 'sa+' | 'sr' | 'sr+' | 'w' | 'w+' | 'wx' | 'wx+' | 'xa' | 'xa+' | 'xw' | 'xw+';

type Parameters = {
  flags?: Flags,
};

function write (path: Buffer | URL | string, $: string, parameters: Parameters = {}): void {
  const writableStream = fs.createWriteStream(path, parameters);

  writableStream.end($);
}

export default write;
