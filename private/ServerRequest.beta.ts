/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';

interface I {
  body?: string;
  method: string;
  parameters?: Record<string, boolean | string>;
}

class ServerRequest {
  constructor (readonly parameters: I['parameters'], readonly url: string) {}

  delete (input: string, i?: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'DELETE', });
  }

  get (input: string, i?: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'GET', });
  }

  head (input: string, i?: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'HEAD', });
  }

  options (input: string, i?: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'OPTIONS', });
  }

  patch (input: string, i?: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'PATCH', });
  }

  post (input: string, i?: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'POST', });
  }

  put (input: string, i?: Omit<I, 'method'>) {
    return this.request(input, { ...i, method: 'PUT', });
  }

  request (input: string, i: I): Promise<any> {
    return new Promise((l, r) => {
      const url = new URL(input, this.url);

      const parameters = { ...i.parameters, ...this.parameters, };

      for (const parameterName in parameters) {
        url.searchParams.set(parameterName, parameters[parameterName]);
      }

      if (typeof window !== 'undefined') {
        const request = new XMLHttpRequest();

        request.addEventListener('error', () => r(new Error('error')));

        request.addEventListener('load', () => l(request.response));

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

      console.trace('⬇️', i.method, url.href, this.constructor.name);

      const request = http.request(url.toString(), { method: i.method, }, (response) => {
        response.on('data', (data) => l(JSON.parse(data)));
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
