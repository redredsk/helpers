import * as t from 'io-ts';
import ServerResponseError from './ServerResponseError';
import validateInput from './types/validateInput';

class ServerResponse {
  private readonly response: Response;

  constructor (response: ServerResponse['response']) {
    this.response = response;

    if (!this.response.ok) {
      throw new ServerResponseError(this);
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

  async json<ResponseType extends t.Any> (responseType: ResponseType): Promise<t.TypeOf<ResponseType>> {
    return validateInput(responseType, await this.response.json());
  }

  async text (): Promise<string> {
    return await this.response.text();
  }
}

export default ServerResponse;
