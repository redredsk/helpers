/*
 * Copyright 2020 Marek Kobida
 */

import MIME from './MIME';

const ftyp: number[] = [ 0x66, 0x74, 0x79, 0x70, ];

const mimeDatabase: MIME[] = [
  new MIME([ 0xFF, 0xD8, 0xFF, 0xE0, ], [ '.jpeg', ], 'image/jpeg'),
  new MIME([ ...ftyp, 0x69, 0x73, 0x6F, 0x6D, ], [ '.mp4', ], 'video/mp4', 4), // isom
  new MIME([ ...ftyp, 0x71, 0x74, ], [ '.mov', ], 'video/quicktime', 4), // qt
];

export default mimeDatabase;
