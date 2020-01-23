import fs from 'fs';

type Flags = 'a' | 'a+' | 'as' | 'as+' | 'ax' | 'ax+' | 'r' | 'r+' | 'rs' | 'rs+' | 'sa' | 'sa+' | 'sr' | 'sr+' | 'w' | 'w+' | 'wx' | 'wx+' | 'xa' | 'xa+' | 'xw' | 'xw+';

function write (path: string, $: string, $$: { flags?: Flags, } = {}): void {
  const writableStream = fs.createWriteStream(path, $$);

  writableStream.end($);
}

export default write;
