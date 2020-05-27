import ServerResponse from './ServerResponse';

class ServerResponseError extends Error {
  serverResponse: ServerResponse;

  constructor (serverResponse: ServerResponseError['serverResponse']) {
    super('The response is not valid.');

    this.name = 'ServerResponseError';

    this.serverResponse = serverResponse;
  }
}

export default ServerResponseError;
