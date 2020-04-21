function isNumber($: any): $ is number {
  return (
    typeof $ === 'number' ||
    Object.prototype.toString.call($) === '[object Number]'
  );
}

export default isNumber;
