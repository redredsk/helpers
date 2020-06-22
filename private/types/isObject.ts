function isObject ($: any): $ is Record<string, boolean | null | number | string | undefined> {
  return Object.prototype.toString.call($) === '[object Object]';
}

export default isObject;
