/*
 * Copyright 2020 Marek Kobida
 */

import { isLeft, } from 'fp-ts/Either';
import * as t from 'io-ts';

import ValidationError from './ValidationError';

class Validation {
  createInputOutputValidator <I extends t.Any, O extends t.Any> ($: (validatedInput: t.TypeOf<I>) => Promise<t.TypeOf<O>>, inputType: I, outputType: O): (input: t.TypeOf<I>) => Promise<t.TypeOf<O>> {
    return async (input) => this.validateInput(outputType, await $(this.validateInput(inputType, input)));
  }

  createOutputValidator <O extends t.Any> ($: () => Promise<t.TypeOf<O>>, outputType: O): () => Promise<t.TypeOf<O>> {
    return async () => this.validateInput(outputType, await $());
  }

  validateInput <I extends t.Any> (inputType: I, input: t.OutputOf<I>): t.TypeOf<I> {
    const $ = inputType.decode(input);

    if (isLeft($)) {
      throw new ValidationError('The input is not valid', $);
    }

    return $.right;
  }
}

export default Validation;
