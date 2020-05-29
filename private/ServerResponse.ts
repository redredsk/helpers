import * as t from 'io-ts';
import ServerResponseError from './ServerResponseError';
import validateInput from './types/validateInput';

class ServerResponse {
  readonly headers: Response['headers'];

  private readonly response: Response;

  readonly type: Response['type'];

  readonly url: Response['url'];

  constructor (response: ServerResponse['response']) {
    this.headers = response.headers;
    this.response = response;
    this.type = response.type;
    this.url = response.url;

    if (!response.ok) {
      throw new ServerResponseError('The response is not valid.', this);
    }
  }

  async arrayBuffer (): Promise<ArrayBuffer> {
    return this.response.clone().arrayBuffer();
  }

  async blob (): Promise<Blob> {
    return this.response.clone().blob();
  }

  async formData (): Promise<FormData> {
    return this.response.clone().formData();
  }

  async json<Type extends t.Any> (type: Type): Promise<t.TypeOf<Type>> {
    return validateInput(type, await this.response.clone().json());
  }

  async text (): Promise<string> {
    return await this.response.clone().text();
  }
}

export default ServerResponse;
