/*
 * Copyright 2020 Marek Kobida
 */

import mime from './mime';

function mimeFromFileExtension (fileExtension: string) {
  return mime.filter((MIME) => MIME.hasFileExtension(fileExtension));
}

export default mimeFromFileExtension;
