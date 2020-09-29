/*
 * Copyright 2020 Marek Kobida
 */

export class MIME {
  constructor (readonly bytes: number[], readonly fileExtensions: string[], readonly name: string, readonly offset: number = 0) {}

  firstFileExtension = (): string => this.fileExtensions[0];

  hasFileExtension = (fileExtension: string): boolean => this.fileExtensions.includes(fileExtension);

  test = (buffer: Buffer): boolean => {
    for (const i in this.bytes) if (this.bytes[i] !== buffer[+i + this.offset]) return false;

    return true;
  }
}

const ftyp: number[] = [ 0x66, 0x74, 0x79, 0x70, ];

const mime: MIME[] = [
  new MIME([ 0xFF, 0xD8, 0xFF, 0xE0, ], [ '.jpeg', ], 'image/jpeg'),
  new MIME([ ...ftyp, 0x69, 0x73, 0x6F, 0x6D, ], [ '.mp4', ], 'video/mp4', 4), // isom
  new MIME([ ...ftyp, 0x71, 0x74, ], [ '.mov', ], 'video/quicktime', 4), // qt
];

export default mime;
