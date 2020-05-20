function isArray ($: any): $ is any[] {
  return Object.prototype.toString.call($) === '[object Array]';
}

export default isArray;
