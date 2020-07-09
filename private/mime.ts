interface Type {
  charset?: string;
  extensions: string[];
}

interface Types {
  [typeName: string]: Type;
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
  'image/png': {
    extensions: [ '.png', ],
  },
  'text/css': {
    charset: 'utf-8',
    extensions: [ '.css', ],
  },
  'text/html': {
    charset: 'utf-8',
    extensions: [ '.html', ],
  },
};

function mime (extension: string): Type & { typeName: string; } {
  for (const typeName in types) {
    const type = types[typeName];

    const typeExtensions = type.extensions;

    for (let i = 0; i < typeExtensions.length; i += 1) {
      const typeExtension = typeExtensions[i];

      if (typeExtension === extension) {
        return { ...type, typeName, };
      }
    }
  }

  return { extensions: [ extension, ], typeName: 'text/plain', };
}

export default mime;
