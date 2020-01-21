import * as t from 'io-ts';
import { fold, } from 'fp-ts/lib/Either';
import { pipe, } from 'fp-ts/lib/pipeable';

class InputValidationError<Validation> extends Error {
  constructor (message: string, validation: t.Validation<Validation>) {
    super(message);

    this.name = 'InputValidationError';

    let $ = '\n';

    for (let i = 0; i < this.paths(validation).length; i += 1) {
      const path = this.paths(validation)[i];

      $ += `\n  ${i + 1}. ${path}`;
    }

    this.message += $;
  }

  paths (validation: t.Validation<Validation>): Array<string> {
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
