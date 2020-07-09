import isArray from './types/isArray';
import isNumber from './types/isNumber';
import isObject from './types/isObject';
import isString from './types/isString';

type BreakpointName =
  | '##'
  | '#';

export type DecodedResponsiveClassName = string;

export type EncodedResponsiveClassName<T extends number | string> =
  | T
  | [ T, ]
  | [ T, { [breakpointName in BreakpointName]?: T }, ]
  | { [breakpointName in BreakpointName]?: T };

function decodeResponsiveClassName ($: string, encodedResponsiveClassName?: EncodedResponsiveClassName<number | string>): DecodedResponsiveClassName[] {
  let decodedResponsiveClassNames: DecodedResponsiveClassName[] = [];

  function addDecodedResponsiveClassName (decodedResponsiveClassName: DecodedResponsiveClassName) {
    decodedResponsiveClassNames = [ ...decodedResponsiveClassNames, decodedResponsiveClassName, ];
  }

  // [ T, ]
  if (isArray(encodedResponsiveClassName)) {
    addDecodedResponsiveClassName(`${$}${encodedResponsiveClassName[0]}`);

    // [ T, { [breakpointName in BreakpointName]?: T }, ]
    if (isObject(encodedResponsiveClassName[1])) {
      for (const breakpointName in encodedResponsiveClassName[1]) {
        addDecodedResponsiveClassName(`${breakpointName}${$}${encodedResponsiveClassName[1][breakpointName as BreakpointName]}`);
      }
    }
  }

  // T
  if (isNumber(encodedResponsiveClassName)) {
    addDecodedResponsiveClassName(`${$}${encodedResponsiveClassName}`);
  }

  // { [breakpointName in BreakpointName]?: T }
  if (isObject(encodedResponsiveClassName)) {
    for (const breakpointName in encodedResponsiveClassName) {
      addDecodedResponsiveClassName(`${breakpointName}${$}${encodedResponsiveClassName[breakpointName as BreakpointName]}`);
    }
  }

  // T
  if (isString(encodedResponsiveClassName)) {
    addDecodedResponsiveClassName(`${$}${encodedResponsiveClassName}`);
  }

  return decodedResponsiveClassNames;
}

export default decodeResponsiveClassName;
