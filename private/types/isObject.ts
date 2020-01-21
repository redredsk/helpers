function isObject ($: any): $ is object {
  return $ !== null && (typeof $ === 'function' || typeof $ === 'object');
}

export default isObject;
