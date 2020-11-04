/*
 * Copyright 2020 Marek Kobida
 */

/** @deprecated */
class ServerRequestError extends Error {
  constructor() {
    super('The request is not valid.');

    this.name = 'ServerRequestError';
  }
}

export default ServerRequestError;
