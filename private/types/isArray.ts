/*
 * Copyright 2020 Marek Kobida
 */

function isArray ($: any): $ is any[] {
  return Object.prototype.toString.call($) === '[object Array]';
}

export default isArray;
