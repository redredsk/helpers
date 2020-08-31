interface Type {
  charset?: string;
  extensions: string[];
}

interface Types {
  [name: string]: Type;
}

const types: Types = {
  'application/javascript': {
    extensions: [ '.js', ],
  },
  'application/json': {
    charset: 'utf-8',
    extensions: [ '.json', '.map', ],
  },
  'font/otf': {
    extensions: [ '.otf', ],
  },
  'image/jpeg': {
    extensions: [ '.jpeg', ],
  },
  'image/png': {
    extensions: [ '.png', ],
  },
  'image/svg+xml': {
    extensions: [ '.svg', ],
  },
  'text/css': {
    charset: 'utf-8',
    extensions: [ '.css', ],
  },
  'text/html': {
    charset: 'utf-8',
    extensions: [ '.html', ],
  },
  'video/mp4': {
    extensions: [ '.mp4', ],
  },
  'video/quicktime': {
    extensions: [ '.mov', ],
  },
};

function mime (extension: string): Type & { name: string; } {
  for (const name in types) {
    const type = types[name];

    for (const i in type.extensions) {
      if (type.extensions[i] === extension) {
        return { ...type, name, };
      }
    }
  }

  return { extensions: [ extension, ], name: 'text/plain', };
}

export default mime;
