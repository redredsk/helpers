/*
 * Copyright 2020 Marek Kobida
 */

import mime from './mime';

function mimeFromBuffer (buffer: Buffer) {
  return mime.filter((MIME) => MIME.test(buffer));
}

export default mimeFromBuffer;
