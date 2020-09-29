/*
 * Copyright 2020 Marek Kobida
 */

import mime, { MIME, } from './mime';

function mimeFromFileExtension (fileExtension: string): MIME[] {
  return mime.filter((MIME) => MIME.hasFileExtension(fileExtension));
}

export default mimeFromFileExtension;
