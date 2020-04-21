import * as t from 'io-ts';
import { isLeft } from 'fp-ts/lib/Either';

import readFile from '../readFile';

import InputValidationError from './InputValidationError';

async function validateInputFromFile<InputType extends t.Any>(
  inputType: InputType,
  file: string
): Promise<t.TypeOf<InputType>> {
  const input: t.OutputOf<InputType> = JSON.parse(await readFile(file));

  const $ = inputType.decode(input);

  if (isLeft($)) {
    throw new InputValidationError(`Input is not valid.`, $);
  }

  return $.right;
}

export default validateInputFromFile;
