/*
 * Copyright 2020 Marek Kobida
 */

function isBoolean ($: any): $ is boolean {
  return $ === false || $ === true || Object.prototype.toString.call($) === '[object Boolean]';
}

export default isBoolean;
