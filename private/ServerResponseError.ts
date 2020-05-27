import ServerResponse from './ServerResponse';

class ServerResponseError extends Error {
  readonly serverResponse: ServerResponse;

  constructor (message: ServerResponseError['message'], serverResponse: ServerResponseError['serverResponse']) {
    super(message);

    this.name = 'ServerResponseError';

    this.serverResponse = serverResponse;
  }
}

export default ServerResponseError;
