/*
 * Copyright 2020 Marek Kobida
 */

import crypto from 'crypto';

function uuid (): string {
  const bytes: Uint8Array = crypto.randomFillSync(new Uint8Array(16));

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const $: string[] = [ ...bytes, ].map((byte): string => {
    const s: string = byte.toString(16);

    return byte < 0x10 ? '0' + s : s;
  });

  return [
    ...$.slice(0, 4),
    '-',
    ...$.slice(4, 6),
    '-',
    ...$.slice(6, 8),
    '-',
    ...$.slice(8, 10),
    '-',
    ...$.slice(10, 16),
  ].join('');
}

export default uuid;
