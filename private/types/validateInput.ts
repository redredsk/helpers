import * as t from 'io-ts';
import InputValidationError from './InputValidationError';
import { isLeft, } from 'fp-ts/lib/Either';

function validateInput<InputType extends t.Any> (inputType: InputType, input: t.OutputOf<InputType>): t.TypeOf<InputType> {
  const $ = inputType.decode(input);

  if (isLeft($)) {
    throw new InputValidationError('The input is not valid.', $);
  }

  return $.right;
}

export default validateInput;
