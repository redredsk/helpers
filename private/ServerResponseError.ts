import ServerResponse from './ServerResponse';

class ServerResponseError extends Error {
  readonly serverResponse: ServerResponse;

  constructor (message: string, serverResponse: ServerResponse) {
    super(message);

    this.name = 'ServerResponseError';

    this.serverResponse = serverResponse;
  }
}

export default ServerResponseError;
