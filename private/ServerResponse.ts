import * as t from 'io-ts';
import ServerResponseError from './ServerResponseError';
import validateInput from './types/validateInput';

class ServerResponse {
  readonly headers: Response['headers'];

  private readonly response: Response;

  readonly type: Response['type'];

  readonly url: Response['url'];

  constructor (response: Response) {
    this.headers = response.headers;

    this.response = response;

    this.type = response.type;

    this.url = response.url;

    if (!response.ok) {
      throw new ServerResponseError('The response is not valid.', this);
    }
  }

  arrayBuffer () {
    return this.response.clone().arrayBuffer();
  }

  blob () {
    return this.response.clone().blob();
  }

  formData () {
    return this.response.clone().formData();
  }

  async json<Type extends t.Any> (type: Type): Promise<t.TypeOf<Type>> {
    return validateInput(type, await this.response.clone().json());
  }

  text () {
    return this.response.clone().text();
  }
}

export default ServerResponse;
