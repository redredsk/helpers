import * as t from 'io-ts';

import InputValidationError from '../types/InputValidationError';
import validateInput from '../types/validateInput';

test('Input is not valid.', () => {
  try {
    validateInput(t.number, 'test');
  } catch (error) {
    expect(error).toBeInstanceOf(InputValidationError);
  }
});

test('Input is not valid.', () => {
  try {
    validateInput(t.type({ test: t.string, }), { test: 1, });
  } catch (error) {
    expect(error).toBeInstanceOf(InputValidationError);
    expect(error.message).toStrictEqual('Input is not valid.\n\n  1. .test');
  }
});

test('Input is valid.', () => {
  const $ = validateInput(t.string, 'test');

  expect($).toStrictEqual('test');
});
