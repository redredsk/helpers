/*
 * Copyright 2020 Marek Kobida
 */

function isFunction ($: any): $ is () => any {
  return Object.prototype.toString.call($) === '[object AsyncFunction]' || Object.prototype.toString.call($) === '[object Function]';
}

export default isFunction;
