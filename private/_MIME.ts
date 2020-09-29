/*
 * Copyright 2020 Marek Kobida
 */

class MIME {
  constructor (readonly bytes: number[], readonly fileExtensions: string[], readonly name: string, readonly offset: number = 0) {}

  firstFileExtension = (): string => this.fileExtensions[0];

  hasFileExtension = (extension: string): boolean => this.fileExtensions.includes(extension);

  test = (buffer: Buffer): boolean => {
    for (const i in this.bytes) if (this.bytes[i] !== buffer[+i + this.offset]) return false;

    return true;
  }
}

export default MIME;
