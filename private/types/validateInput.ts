import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';

import InputValidationError from './InputValidationError';

function validateInput<InputType extends t.Any>(
  inputType: InputType,
  input: t.OutputOf<InputType>
): t.TypeOf<InputType> {
  const $ = inputType.decode(input);

  if (isLeft($)) {
    throw new InputValidationError('Input is not valid.', $);
  }

  return $.right;
}

export default validateInput;
