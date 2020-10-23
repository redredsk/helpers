/*
 * Copyright 2020 Marek Kobida
 */

import mime, { MIME, } from './mime';

function mimeFromFileExtension (fileExtension: string): MIME | undefined {
  return mime.find((MIME) => MIME.hasFileExtension(fileExtension));
}

export default mimeFromFileExtension;
