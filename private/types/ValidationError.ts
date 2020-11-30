/*
 * Copyright 2020 Marek Kobida
 */

import { fold } from 'fp-ts/Either';
import { pipe } from 'fp-ts/pipeable';
import * as t from 'io-ts';

class ValidationError<Validation extends t.Validation<t.Any>> extends Error {
  constructor(message: string, validation: Validation) {
    super(message);

    const messages = pipe(
      validation,
      fold(
        errors =>
          errors.map(
            validationError =>
              `${typeof validationError.value}\n${this.validationErrorContextToString(
                validationError.context
              )}`
          ),
        () => []
      )
    );

    messages.forEach(message => (this.message += `\n- ${message}`));

    this.name = 'ValidationError';
  }

  validationErrorContextToString(context: t.Context): string {
    return context
      .map(({ key, type }) => {
        if (key) {
          return `  - "${key}" is not a valid ${type.name}`;
        }

        return `  - is not a valid ${type.name}`;
      })
      .join('\n');
  }
}

export default ValidationError;
