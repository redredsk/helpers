import * as t from 'io-ts';

import validateInput from './types/validateInput';

class ServerResponse {
  readonly headers: Response['headers'];

  private readonly response: Response;

  readonly status: Response['status'];

  readonly statusText: Response['statusText'];

  readonly type: Response['type'];

  readonly url: Response['url'];

  constructor (response: Response) {
    this.headers = response.headers;

    this.response = response;

    this.status = response.status;

    this.statusText = response.statusText;

    this.type = response.type;

    this.url = response.url;
  }

  arrayBuffer () {
    return this.response.arrayBuffer();
  }

  blob () {
    return this.response.blob();
  }

  formData () {
    return this.response.formData();
  }

  async json<Type extends t.Any> (type: Type): Promise<t.TypeOf<Type>> {
    return validateInput(type, await this.response.json());
  }

  text () {
    return this.response.text();
  }
}

export default ServerResponse;
