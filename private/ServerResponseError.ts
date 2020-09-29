/*
 * Copyright 2020 Marek Kobida
 */

import ServerResponse from './ServerResponse';

class ServerResponseError extends Error {
  readonly serverResponse: ServerResponse;

  constructor (serverResponse: ServerResponse) {
    super(serverResponse.statusText);

    this.name = 'ServerResponseError';

    this.serverResponse = serverResponse;
  }
}

export default ServerResponseError;
