/*
 * Copyright 2020 Marek Kobida
 */

import mime, { MIME, } from './mime';

function mimeFromBuffer (buffer: Buffer): MIME | undefined {
  return mime.find((MIME) => MIME.test(buffer));
}

export default mimeFromBuffer;
