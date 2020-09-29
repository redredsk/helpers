/*
 * Copyright 2020 Marek Kobida
 */

import * as t from 'io-ts';

import validateInput from './validateInput';

class Validation<C extends Record<string, unknown>> {
  constructor (readonly context: C) {}

  validateInputOutput <I extends t.Any, O extends t.Any> ($: (validatedInput: t.TypeOf<I>, context: C) => Promise<t.TypeOf<O>>, inputType: I, outputType: O): (input: t.TypeOf<I>) => Promise<t.TypeOf<O>> {
    return async (input) => validateInput(outputType, await $(validateInput(inputType, input), this.context));
  }

  validateOutput <O extends t.Any> ($: (context: C) => Promise<t.TypeOf<O>>, outputType: O): () => Promise<t.TypeOf<O>> {
    return async () => validateInput(outputType, await $(this.context));
  }
}

export default Validation;
