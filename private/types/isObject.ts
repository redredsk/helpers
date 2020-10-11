/*
 * Copyright 2020 Marek Kobida
 */

function isObject ($: any): $ is Record<string, unknown> {
  return Object.prototype.toString.call($) === '[object Object]';
}

export default isObject;
