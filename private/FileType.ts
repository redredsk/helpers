/*
 * Copyright 2020 Marek Kobida
 */

interface T {
  byteOffset: number;
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
      byteOffset: 0,
      bytes: [0xff, 0xd8, 0xff],
      fileExtensions: ['.jpeg'],
      mime: 'image/jpeg',
    },
    {
      byteOffset: 4,
      bytes: [...this.#ftyp, 0x69, 0x73, 0x6f, 0x6d],
      fileExtensions: ['.mp4'],
      mime: 'video/mp4',
    },
    {
      byteOffset: 4,
      bytes: [...this.#ftyp, 0x71, 0x74],
      fileExtensions: ['.mov'],
      mime: 'video/quicktime',
    },
  ];

  fromBuffer(buffer: Buffer): T | undefined {
    return this.fileTypes.find(
      fileType =>
        fileType.bytes.findIndex(
          (byte, i) => byte !== buffer[fileType.byteOffset + i],
        ) === -1,
    );
  }

  fromFileExtension(fileExtension: string): T | undefined {
    return this.fileTypes.find(fileType =>
      fileType.fileExtensions.includes(fileExtension),
    );
  }
}

export default new FileType();
