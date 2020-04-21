import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';

import InputValidationError from './InputValidationError';

function validateInput<I extends t.Any>(
  Input: I,
  input: t.OutputOf<I>
): t.TypeOf<I> {
  const $ = Input.decode(input);

  if (isLeft($)) {
    throw new InputValidationError('Input is not valid.', $);
  }

  return $.right;
}

export default validateInput;
