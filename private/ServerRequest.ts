import ServerResponse from './ServerResponse';

type I = RequestInit & { parameters?: Record<string, string>; };

class ServerRequest {
  private readonly url: string;

  constructor (url: ServerRequest['url']) {
    this.url = url;
  }

  async delete (url: string, i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), { ...i, method: 'DELETE', });

    return new ServerResponse(response);
  }

  async get (url: string, i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), { ...i, method: 'GET', });

    return new ServerResponse(response);
  }

  async head (url: string, i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), { ...i, method: 'HEAD', });

    return new ServerResponse(response);
  }

  async options (url: string, i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), { ...i, method: 'OPTIONS', });

    return new ServerResponse(response);
  }

  async patch (url: string, body: I['body'], i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), { ...i, body, method: 'PATCH', });

    return new ServerResponse(response);
  }

  async post (url: string, body: I['body'], i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), { ...i, body, method: 'POST', });

    return new ServerResponse(response);
  }

  async put (url: string, body: I['body'], i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), { ...i, body, method: 'PUT', });

    return new ServerResponse(response);
  }

  async request (url: string, i: I = {}): Promise<ServerResponse> {
    const response = await fetch(this.a(url, i.parameters), i.parameters);

    return new ServerResponse(response);
  }

  private a (url: string, i: I['parameters'] = {}): string {
    const b = new URL(url, this.url);

    if (i) {
      for (let c in i) {
        b.searchParams.set(c, i[c]);
      }
    }

    return b.toString();
  }
}

export default ServerRequest;
