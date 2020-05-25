class ServerRequestError extends Error {
  response: Response;

  constructor (message: string, response: Response) {
    super(message);

    this.name = 'ServerRequestError';

    this.response = response;
  }
}

export default ServerRequestError;
