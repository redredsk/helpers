/*
 * Copyright 2020 Marek Kobida
 */

import http from 'http';

type T = Array<T> | boolean | null | number | string | { [l: string]: T };

// https://nodejs.org/api/http.html#http_class_http_incomingmessage
function jsonFromHttpServerRequest(
  request: http.IncomingMessage,
): Promise<T | undefined> {
  return new Promise((l, r) => {
    const chunks: Buffer[] = [];

    // https://nodejs.org/api/stream.html#stream_event_data
    request.on('data', chunk => chunks.push(chunk));

    // https://nodejs.org/api/stream.html#stream_event_end
    request.on('end', () => {
      if (chunks.length > 0) {
        l(JSON.parse(Buffer.concat(chunks).toString()));
      } else {
        l(undefined);
      }
    });

    // https://nodejs.org/api/stream.html#stream_event_error
    request.on('error', error => r(error));
  });
}

export default jsonFromHttpServerRequest;
