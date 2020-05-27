import * as t from 'io-ts';
import ServerResponseError from './ServerResponseError';
import validateInput from './types/validateInput';

class ServerResponse {
  private readonly response: Response;

  constructor (response: ServerResponse['response']) {
    this.response = response;

    if (!this.response.ok) {
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

  readonly headers = this.response.headers;

  async json<Type extends t.Any> (type: Type): Promise<t.TypeOf<Type>> {
    try {
      return validateInput(type, await this.response.json());
    } catch (error) {
      throw new ServerResponseError('The JSON is not valid.', this);
    }
  }

  async text (): Promise<string> {
    return await this.response.text();
  }

  readonly type = this.response.type;

  readonly url = this.response.url;
}

export default ServerResponse;
