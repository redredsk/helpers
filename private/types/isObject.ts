function isObject ($: any): $ is object {
  return $ !== null && typeof $ === 'object';
}

export default isObject;
