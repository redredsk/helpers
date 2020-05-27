import ServerResponse from './ServerResponse';

class ServerRequest {
  private readonly url: string;

  constructor (url: ServerRequest['url']) {
    this.url = url;
  }

  async delete (url: string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, method: 'DELETE', });

    return new ServerResponse(response);
  }

  async get (url: string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, method: 'GET', });

    return new ServerResponse(response);
  }

  async head (url: string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, method: 'HEAD', });

    return new ServerResponse(response);
  }

  async options (url: string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, method: 'OPTIONS', });

    return new ServerResponse(response);
  }

  async patch (url: string, body: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, body, method: 'PATCH', });

    return new ServerResponse(response);
  }

  async post (url: string, body: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, body, method: 'POST', });

    return new ServerResponse(response);
  }

  async put (url: string, body: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, { ...$, body, method: 'PUT', });

    return new ServerResponse(response);
  }

  async request (url: string, $: Record<string, unknown> = {}): Promise<ServerResponse> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url, $);

    return new ServerResponse(response);
  }
}

export default ServerRequest;
