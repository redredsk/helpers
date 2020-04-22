import * as t from 'io-ts';
import InputValidationError from '../types/InputValidationError';
import validateInputFromFile from '../types/validateInputFromFile';

const path = './packages/helpers/private/tests/test.json';

test('Input is not valid.', async () => {
  expect.assertions(1);

  try {
    await validateInputFromFile(t.number, path);
  } catch (error) {
    expect(error).toBeInstanceOf(InputValidationError);
  }
});

test('Input is valid.', async () => {
  expect.assertions(1);

  const $ = await validateInputFromFile(
    t.type({ version: t.literal('1.0.0') }),
    path
  );

  expect($).toStrictEqual({ version: '1.0.0' });
});
