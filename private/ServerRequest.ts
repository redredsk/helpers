import ServerResponse from './ServerResponse';

class ServerRequest {
  url: string;

  constructor (url: ServerRequest['url']) {
    this.url = url;
  }

  async get (url: string): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url);

    return new ServerResponse(response);
  }

  async post (url: string): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { method: 'POST', });

    return new ServerResponse(response);
  }
}

export default ServerRequest;
