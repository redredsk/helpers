/*
 * Copyright 2020 Marek Kobida
 */

interface T {
  bytes: number[];
  fileExtensions: string[];
  mime: string;
}

class FileType {
  #ftyp: T['bytes'] = [0x66, 0x74, 0x79, 0x70];

  fileTypes: T[] = [
    {
      byteOffset: 4,
      bytes: [...this.#ftyp, 0x68, 0x65, 0x69, 0x63],
      fileExtensions: ['.heic'],
      mime: 'image/heic',
    },
    {
      bytes: [ 0xFF, 0xD8, 0xFF, ],
      fileExtensions: [ '.jpeg', ],
      mime: 'image/jpeg',
    },
    {
      bytes: [ 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D, ],
      fileExtensions: [ '.mp4', ],
      mime: 'video/mp4',
    },
    {
      bytes: [ 0x66, 0x74, 0x79, 0x70, 0x71, 0x74, ],
      fileExtensions: [ '.mov', ],
      mime: 'video/quicktime',
    },
  ]

  fromBuffer (buffer: Buffer): T | undefined {
    return this.fileTypes.find((fileType) => fileType.bytes.findIndex((byte, i) => byte !== buffer[i]) === -1);
  }

  fromFileExtension (fileExtension: string): T | undefined {
    return this.fileTypes.find((fileType) => fileType.fileExtensions.includes(fileExtension));
  }
}

export default new FileType();
