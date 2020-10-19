/*
 * Copyright 2020 Marek Kobida
 */

import { isLeft, } from 'fp-ts/Either';
import * as t from 'io-ts';

import ValidationError from './ValidationError';

class Validation {
  createInputOutputValidator <I extends t.Any, O extends t.Any> (afterValidationFunction: (validatedInput: t.TypeOf<I>) => Promise<t.TypeOf<O>>, inputType: I, outputType: O): (input: t.TypeOf<I>) => Promise<t.TypeOf<O>> {
    return async (input) => this.validateInput(outputType, await afterValidationFunction(this.validateInput(inputType, input)));
  }

  createOutputValidator <O extends t.Any> (afterValidationFunction: () => Promise<t.TypeOf<O>>, outputType: O): () => Promise<t.TypeOf<O>> {
    return async () => this.validateInput(outputType, await afterValidationFunction());
  }

  validateInput <I extends t.Any> (inputType: I, input: t.OutputOf<I>): t.TypeOf<I> {
    const validation = inputType.decode(input);

    if (isLeft(validation)) {
      throw new ValidationError('The input is not valid', validation);
    }

    return validation.right;
  }
}

export default Validation;
