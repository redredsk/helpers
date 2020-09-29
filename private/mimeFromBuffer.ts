/*
 * Copyright 2020 Marek Kobida
 */

import MIME from './MIME';
import mimeDatabase from './mimeDatabase';

function mimeFromBuffer (buffer: Buffer): MIME[] {
  return mimeDatabase.filter((type) => type.test(buffer));
}

export default mimeFromBuffer;
