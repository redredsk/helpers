import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';

import read from '../read';

import InputValidationError from './InputValidationError';

/**
 * await validateInputFromPath(t.string, './test.json');
 */
async function validateInputFromPath<I extends t.Any>(Input: I, path: string): Promise<t.TypeOf<I>> {
  const input: t.OutputOf<I> = JSON.parse(await read(path));

  const $ = Input.decode(input);

  if (isLeft($)) {
    throw new InputValidationError(`Input "${path}" is not valid.`, $);
  }

  return $.right;
}

export default validateInputFromPath;
