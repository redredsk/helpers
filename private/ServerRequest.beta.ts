/*
 * Copyright 2020 Marek Kobida
 */

import * as t from 'io-ts';

import validateInput from './types/validateInput';

interface I {
  body?: string;
  json: t.Any;
  method: string;
  parameters?: Record<string, boolean | string>;
}

class ServerRequest {
  constructor (readonly url: string) {}

  delete (input: string, i: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'DELETE', });
  }

  get (input: string, i: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'GET', });
  }

  head (input: string, i: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'HEAD', });
  }

  options (input: string, i: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'OPTIONS', });
  }

  patch (input: string, i: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'PATCH', });
  }

  post (input: string, i: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'POST', });
  }

  put (input: string, i: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'PUT', });
  }

  request (input: string, i: I): Promise<t.TypeOf<typeof i['json']>> {
    return new Promise(($) => {
      const url = new URL(input, this.url);

      if (i.parameters) {
        for (const parameterName in i.parameters) {
          url.searchParams.set(parameterName, i.parameters[parameterName].toString());
        }
      }

      const request = new XMLHttpRequest();

      request.addEventListener('load', () => $(validateInput(i.json, request.response)));

      request.addEventListener('progress', (e) => e.lengthComputable && console.log('⬇️', url.href, e.loaded / e.total));

      request.upload.addEventListener('progress', (e) => e.lengthComputable && console.log('⬆️️', url.href, e.loaded / e.total));

      request.responseType = 'json';

      request.open(i.method, url.toString());

      if (i.body) {
        request.send(i.body);
      } else {
        request.send();
      }
    });
  }
}

export default ServerRequest;
