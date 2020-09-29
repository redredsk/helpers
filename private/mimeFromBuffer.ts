/*
 * Copyright 2020 Marek Kobida
 */

import mime, { MIME, } from './mime';

function mimeFromBuffer (buffer: Buffer): MIME[] {
  return mime.filter((MIME) => MIME.test(buffer));
}

export default mimeFromBuffer;
