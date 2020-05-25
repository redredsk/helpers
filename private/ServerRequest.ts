import * as t from 'io-ts';
import ServerRequestError from './ServerRequestError';
import validateInput from './types/validateInput';

class ServerRequest {
  url: string;

  constructor (url: ServerRequest['url']) {
    this.url = url;
  }

  async json<ResponseType extends t.Any> (responseType: ResponseType, url: ServerRequest['url']): Promise<t.TypeOf<ResponseType>> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url);

    if (response.ok) {
      return validateInput(responseType, await response.json());
    }

    throw new ServerRequestError('The response is not valid.', response);
  }

  async text (url: ServerRequest['url']): Promise<string> {
    const response = await fetch(/^\//.test(url) ? this.url + url : url);

    if (response.ok) {
      return response.text();
    }

    throw new ServerRequestError('The response is not valid.', response);
  }
}

export default ServerRequest;
