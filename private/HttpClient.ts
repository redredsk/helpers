/*
 * Copyright 2020 Marek Kobida
 */

import Validation from './types/Validation';

interface I {
  body?: string;
  method: string;
  parameters?: Record<string, unknown>;
}

class HttpClient {
  readonly validation = new Validation();

  constructor(
    readonly urlSearchParameters: I['parameters'],
    readonly url: string,
  ) {}

  delete(url: string, i?: Omit<I, 'method'>) {
    return this.request(url, { ...i, method: 'DELETE' });
  }

  get(url: string, i?: Omit<I, 'method'>) {
    return this.request(url, { ...i, method: 'GET' });
  }

  head(url: string, i?: Omit<I, 'method'>) {
    return this.request(url, { ...i, method: 'HEAD' });
  }

  options(url: string, i?: Omit<I, 'method'>) {
    return this.request(url, { ...i, method: 'OPTIONS' });
  }

  patch(url: string, i?: Omit<I, 'method'>) {
    return this.request(url, { ...i, method: 'PATCH' });
  }

  post(url: string, i?: Omit<I, 'method'>) {
    return this.request(url, { ...i, method: 'POST' });
  }

  put(url: string, i?: Omit<I, 'method'>) {
    return this.request(url, { ...i, method: 'PUT' });
  }

  request(input: string, i: I): Promise<any> {
    return new Promise((l, r) => {
      const url = new URL(input, this.url);

      const parameters = { ...i.parameters, ...this.urlSearchParameters };

      for (const parameterName in parameters) {
        url.searchParams.set(parameterName, parameters[parameterName]);
      }

      // 1.

      if (typeof window !== 'undefined') {
        fetch(url.toString(), { body: i.body, method: i.method })
          .then(response => l(response.json()))
          .catch(error => r(error));

        return;
      }

      // 2.

      const http = require('http');

      const request = http.request(
        url.toString(),
        { method: i.method },
        response => {
          response.on('data', data => l(JSON.parse(data)));
          response.on('error', error => r(error));
        },
      );

      if (i.body) {
        request.end(i.body);
      } else {
        request.end();
      }
    });
  }
}

export default HttpClient;
