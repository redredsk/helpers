import readFile from '../readFile';

const path = './packages/helpers/private/tests/test.json';

test('readFile', async () => {
  expect.assertions(1);

  const $ = await readFile(path);

  expect($).toStrictEqual('{\n  "version": "1.0.0"\n}\n');
});
