import { isLeft, } from 'fp-ts/lib/Either';
import * as t from 'io-ts';

function validateInput<InputType extends t.Any> (inputType: InputType, input: t.OutputOf<InputType>): t.TypeOf<InputType> {
  const $ = inputType.decode(input);

  if (isLeft($)) {
    throw new Error('The input is not valid.');
  }

  return $.right;
}

export default validateInput;
