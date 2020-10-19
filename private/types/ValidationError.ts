/*
 * Copyright 2020 Marek Kobida
 */

import { fold, } from 'fp-ts/Either';
import { pipe, } from 'fp-ts/pipeable';
import * as t from 'io-ts';

class ValidationError<Validation> extends Error {
  constructor (message: string, validation: t.Validation<Validation>) {
    super(message);

    function getContextPath (context: t.Context): string {
      return context.map(({ key, type, }, i) => `     ${i + 1}. ${key ? `${key} : ` : ''}${type.name}`).join('\n');
    }

    pipe(
      validation,
      fold(
        (errors) => errors.map(
          (error) => error.message !== undefined
            ? error.message
            : `${JSON.stringify(error.value)}\n${getContextPath(error.context)}`
        ),
        () => []
      )
    ).forEach(($$, i) => {
      this.message += `\n\n  ${i + 1}. ${$$}`;
    });

    this.name = 'ValidationError';
  }
}

export default ValidationError;
