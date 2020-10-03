/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';

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
    return new Promise((l, r) => {
      const url = new URL(input, this.url);

      if (i.parameters) {
        for (const parameterName in i.parameters) {
          url.searchParams.set(parameterName, i.parameters[parameterName]);
        }
      }

      if (typeof window !== 'undefined') {
        const request = new XMLHttpRequest();

        request.addEventListener('error', () => r(new Error('error')));

        request.addEventListener('load', () => {
          try {
            l(validateInput(i.json, request.response));
          } catch (error) {
            r(error);
          }
        });

        request.addEventListener('progress', (e) => e.lengthComputable && console.log('⬇️', i.method, url.href, e.loaded / e.total));

        request.upload.addEventListener('progress', (e) => e.lengthComputable && console.log('⬆️️', i.method, url.href, e.loaded / e.total));

        request.responseType = 'json';

        request.open(i.method, url.toString());

        if (i.body) {
          request.send(i.body);
        } else {
          request.send();
        }

        return;
      }

      console.log('⬇️', i.method, url.href);

      const request = http.request(url.toString(), { method: i.method, }, (response) => {
        response.on('data', (data) => {
          try {
            l(validateInput(i.json, JSON.parse(data)));
          } catch (error) {
            r(error);
          }
        });
      });

      if (i.body) {
        request.end(i.body);
      } else {
        request.end();
      }
    });
  }
}

export default ServerRequest;
