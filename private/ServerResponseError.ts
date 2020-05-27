import ServerResponse from './ServerResponse';

class ServerResponseError extends Error {
  serverResponse: ServerResponse;

  constructor (message: string, serverResponse: ServerResponseError['serverResponse']) {
    super(message);

    this.name = 'ServerResponseError';

    this.serverResponse = serverResponse;
  }
}

export default ServerResponseError;
