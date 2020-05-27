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
    return this.response.arrayBuffer();
  }

  async blob (): Promise<Blob> {
    return this.response.blob();
  }

  async formData (): Promise<FormData> {
    return this.response.formData();
  }

  async json<Type extends t.Any> (type: Type): Promise<t.TypeOf<Type>> {
    return validateInput(type, await this.response.json());
  }

  async text (): Promise<string> {
    return await this.response.text();
  }
}

export default ServerResponse;
