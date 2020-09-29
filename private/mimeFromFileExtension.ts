/*
 * Copyright 2020 Marek Kobida
 */

import MIME from './MIME';
import mimeDatabase from './mimeDatabase';

function mimeFromFileExtension (fileExtension: string): MIME[] {
  return mimeDatabase.filter((type) => type.hasFileExtension(fileExtension));
}

export default mimeFromFileExtension;
