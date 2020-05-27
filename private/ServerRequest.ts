import ServerResponse from './ServerResponse';

interface I extends RequestInit {
  parameters?: Record<string, string>;
}

class ServerRequest {
  private readonly url: string;

  constructor (url: ServerRequest['url']) {
    this.url = url;
  }

  async delete (url: string, i: Omit<I, 'method'> = {}): Promise<ServerResponse> {
    return this.request(url, { ...i, method: 'DELETE', });
  }

  get (url: string, i: Omit<I, 'method'> = {}): Promise<ServerResponse> {
    return this.request(url, { ...i, method: 'GET', });
  }

  head (url: string, i: Omit<I, 'method'> = {}): Promise<ServerResponse> {
    return this.request(url, { ...i, method: 'HEAD', });
  }

  options (url: string, i: Omit<I, 'method'> = {}): Promise<ServerResponse> {
    return this.request(url, { ...i, method: 'OPTIONS', });
  }

  patch (url: string, body: I['body'], i: Omit<I, 'body' | 'method'> = {}): Promise<ServerResponse> {
    return this.request(url, { ...i, body, method: 'PATCH', });
  }

  post (url: string, body: I['body'], i: Omit<I, 'body' | 'method'> = {}): Promise<ServerResponse> {
    return this.request(url, { ...i, body, method: 'POST', });
  }

  put (url: string, body: I['body'], i: Omit<I, 'body' | 'method'> = {}): Promise<ServerResponse> {
    return this.request(url, { ...i, body, method: 'HEAD', });
  }

  async request (url: string, i: I = {}): Promise<ServerResponse> {
    url = this.a(url, i);

    if (process.env.NODE_ENV === 'development') {
      console.log(this.constructor.name, url, i);
    }

    const response = await fetch(url, i);

    return new ServerResponse(response);
  }

  private a (url: string, i: Omit<I, 'method'> = {}): string {
    const b = new URL(url, this.url);

    if (i.parameters) {
      for (let c in i.parameters) {
        b.searchParams.set(c, i.parameters[c]);
      }

      delete i.parameters;
    }

    return b.toString();
  }
}

export default ServerRequest;
