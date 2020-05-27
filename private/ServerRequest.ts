import ServerResponse from './ServerResponse';

class ServerRequest {
  private readonly url: string;

  constructor (url: ServerRequest['url']) {
    this.url = url;
  }

  async get (url: string, $: Record<string, unknown>): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, method: 'GET', });

    return new ServerResponse(response);
  }

  async post (url: string, data: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string, $: Record<string, unknown>): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, body: data, method: 'POST', });

    return new ServerResponse(response);
  }
}

export default ServerRequest;
