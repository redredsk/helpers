/*
 * Copyright 2020 Marek Kobida
 */

import * as t from 'io-ts';

import validateInput from './validateInput';

class Validation {
  validateInputOutput <I extends t.Any, O extends t.Any> ($: (validatedInput: t.TypeOf<I>) => Promise<t.TypeOf<O>>, inputType: I, outputType: O): (input: t.TypeOf<I>) => Promise<t.TypeOf<O>> {
    return async (input) => validateInput(outputType, await $(validateInput(inputType, input)));
  }

  validateOutput <O extends t.Any> ($: () => Promise<t.TypeOf<O>>, outputType: O): () => Promise<t.TypeOf<O>> {
    return async () => validateInput(outputType, await $());
  }
}

export default Validation;
