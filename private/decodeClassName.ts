import css from '@redredsk/design/index.css';

import isArray from './types/isArray';
import isNumber from './types/isNumber';
import isObject from './types/isObject';
import isString from './types/isString';

export type DecodedClassName = string;

export type EncodedClassName =
  | EncodedClassName[]
  | null
  | number
  | string
  | undefined
  | { [decodedClassName: string]: boolean | null | undefined; };

function $ (...encodedClassNames: EncodedClassName[]): DecodedClassName[] {
  let decodedClassNames: DecodedClassName[] = [];

  function addDecodedClassName (decodedClassName: DecodedClassName) {
    decodedClassNames = [ ...decodedClassNames, decodedClassName, ];
  }

  for (const encodedClassName of encodedClassNames) {
    if (isArray(encodedClassName)) {
      for (const decodedClassName of $(...encodedClassName)) {
        addDecodedClassName(decodedClassName);
      }
    }

    if (isNumber(encodedClassName)) {
      addDecodedClassName(`${encodedClassName}`);
    }

    if (isObject(encodedClassName)) {
      for (const decodedClassName in encodedClassName) {
        if (encodedClassName[decodedClassName]) {
          addDecodedClassName(decodedClassName);
        }
      }
    }

    if (isString(encodedClassName)) {
      for (const decodedClassName of encodedClassName.split(' ')) {
        addDecodedClassName(decodedClassName);
      }
    }
  }

  return decodedClassNames;
}

function decodeClassName (...encodedClassNames: EncodedClassName[]): DecodedClassName | undefined {
  const decodedClassNames = $(...encodedClassNames);

  for (const i in decodedClassNames) {
    const decodedClassName = decodedClassNames[i];

    decodedClassNames[i] = css[decodedClassName] || decodedClassName;
  }

  if (decodedClassNames.length > 0) {
    return decodedClassNames.join(' ');
  }
}

export default decodeClassName;
