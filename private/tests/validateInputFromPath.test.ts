import * as t from 'io-ts';

import InputValidationError from '../types/InputValidationError';
import validateInputFromPath from '../types/validateInputFromPath';

const path = './packages/helpers/private/tests/test.json';

test('Input is not valid.', async () => {
  expect.assertions(1);

  try {
    await validateInputFromPath(t.number, path);
  } catch (error) {
    expect(error).toBeInstanceOf(InputValidationError);
  }
});

test('Input is valid.', async () => {
  expect.assertions(1);

  const $ = await validateInputFromPath(t.type({ version: t.literal('1.0.0'), }), path);

  expect($).toStrictEqual({ version: '1.0.0', });
});
