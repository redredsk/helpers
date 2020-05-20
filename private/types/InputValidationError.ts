import * as t from 'io-ts';
import { fold, } from 'fp-ts/lib/Either';
import { pipe, } from 'fp-ts/lib/pipeable';

class InputValidationError<Validation> extends Error {
  constructor (message: string, validation: t.Validation<Validation>) {
    super(message);

    this.message += '\n';

    this.name = 'InputValidationError';

    const paths = this.paths(validation);

    for (let i = 0; i < paths.length; i += 1) {
      const path = paths[i];

      this.message += `\n  ${i + 1}. ${path}`;
    }
  }

  paths (validation: t.Validation<Validation>): string[] {
    return pipe(
      validation,
      fold(
        (errors) => errors.map((error) => error.context.map(({ key, }) => key).join('.')),
        () => []
      )
    );
  }
}

export default InputValidationError;
