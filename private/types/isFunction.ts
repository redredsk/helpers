/*
 * Copyright 2020 Marek Kobida
 */

function isFunction ($: any): $ is (...$$: any[]) => any {
  return typeof $ === 'function';
}

export default isFunction;
