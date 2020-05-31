import ServerResponse from './ServerResponse';
import isString from './types/isString';

declare global {
  interface RequestInit {
    parameters?: Record<string, string>;
  }
}

class ServerRequest {
  private readonly url: string;

  constructor (url: string) {
    this.url = url;
  }

  delete (input: RequestInfo, init: Omit<RequestInit, 'method'> = {}) {
    return this.request(input, { ...init, method: 'DELETE', });
  }

  get (input: RequestInfo, init: Omit<RequestInit, 'method'> = {}) {
    return this.request(input, { ...init, method: 'GET', });
  }

  head (input: RequestInfo, init: Omit<RequestInit, 'method'> = {}) {
    return this.request(input, { ...init, method: 'HEAD', });
  }

  options (input: RequestInfo, init: Omit<RequestInit, 'method'> = {}) {
    return this.request(input, { ...init, method: 'OPTIONS', });
  }

  patch (input: RequestInfo, body: RequestInit['body'], init: Omit<RequestInit, 'body' | 'method'> = {}) {
    return this.request(input, { ...init, body, method: 'PATCH', });
  }

  post (input: RequestInfo, body: RequestInit['body'], init: Omit<RequestInit, 'body' | 'method'> = {}) {
    return this.request(input, { ...init, body, method: 'POST', });
  }

  put (input: RequestInfo, body: RequestInit['body'], init: Omit<RequestInit, 'body' | 'method'> = {}) {
    return this.request(input, { ...init, body, method: 'HEAD', });
  }

  async request (input: RequestInfo, init: RequestInit = {}): Promise<ServerResponse> {
    input = this.test(input, init);

    if (process.env.NODE_ENV === 'development') {
      console.log(this.constructor.name, input, init);
    }

    const response = await fetch(input, init);

    return new ServerResponse(response);
  }

  private test (input: RequestInfo, init: RequestInit = {}): RequestInfo {
    if (isString(input)) {
      const url = new URL(input, this.url);

      if (init.parameters) {
        for (let parameterName in init.parameters) {
          url.searchParams.set(parameterName, init.parameters[parameterName]);
        }

        delete init.parameters;
      }

      return url.toString();
    }

    return input;
  }
}

export default ServerRequest;
