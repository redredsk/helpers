import isString from './types/isString';

export interface RequestParameters {
  as?: 'json' | 'text';
  body?: FormData | URLSearchParams | null | string;
  headers?: Array<Array<string>> | Headers | { [name: string]: string };
  method?: string;
  queries?: { [name: string]: string };
}

async function createServerRequest (url: URL | string, parameters: RequestParameters & { as: 'text' }): Promise<string>;
async function createServerRequest<R> (url: URL | string, parameters: RequestParameters & { as: 'json' }): Promise<R>;
async function createServerRequest<R> (url: URL | string, parameters: RequestParameters): Promise<R | string> {
  if (isString(url)) {
    url = new URL(url, `http://${process.env.ADDRESS}:1338`);
  }

  if (parameters.queries) {
    for (const name in parameters.queries) {
      url.searchParams.set(name, parameters.queries[name]);
    }
  }

  try {
    const response = await fetch(url.toString(), parameters);

    if (response.ok) {
      if (parameters.as === 'json') {
        return response.json();
      }

      if (parameters.as === 'text') {
        return response.text();
      }
    }
  } catch (error) {

  }

  throw new Error('Odpoveď zo servera nie je platná.');
}

export default createServerRequest;
