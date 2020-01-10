import read from '../read';

const path = './packages/helpers/private/tests/test.json';

test('read', async () => {
  expect.assertions(1);

  const $ = await read(path);

  expect($).toStrictEqual('{\n  "version": "1.0.0"\n}\n');
});
