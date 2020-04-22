import * as t from 'io-ts';
import InputValidationError from './InputValidationError';
import readFile from '../readFile';
import { isLeft } from 'fp-ts/lib/Either';

async function validateInputFromFile<InputFromFileType extends t.Any>(
  inputFromFileType: InputFromFileType,
  file: string
): Promise<t.TypeOf<InputFromFileType>> {
  const inputFromFile: t.OutputOf<InputFromFileType> = JSON.parse(
    await readFile(file)
  );

  const $ = inputFromFileType.decode(inputFromFile);

  if (isLeft($)) {
    throw new InputValidationError(
      `Input from the file "${file}" is not valid.`,
      $
    );
  }

  return $.right;
}

export default validateInputFromFile;
