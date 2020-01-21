function isString ($: any): $ is string {
  return typeof $ === 'string' || Object.prototype.toString.call($) === '[object String]';
}

export default isString;
