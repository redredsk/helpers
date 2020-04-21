function isFunction($: any): $ is (...$$: any[]) => any {
  return (
    Object.prototype.toString.call($) === '[object AsyncFunction]' ||
    Object.prototype.toString.call($) === '[object Function]'
  );
}

export default isFunction;
