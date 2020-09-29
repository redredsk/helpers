/*
 * Copyright 2020 Marek Kobida
 */

function isNumber ($: any): $ is number {
  return typeof $ === 'number' || Object.prototype.toString.call($) === '[object Number]';
}

export default isNumber;
