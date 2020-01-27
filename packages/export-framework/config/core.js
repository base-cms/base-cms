const { getAsObject } = require('@base-cms/object-path');
const AbstractConfig = require('./abstract-config');

const defaultTypes = {
  csv: {
    headers: {
      'Content-Type': 'text/plain',
    },
    formatter: v => v.map(l => `"${l.replace('"', '\\"').join('", "')}"`).join('\n'),
  },
  json: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  txt: {
    formatter: v => v.join('\n'),
  },
};

const fn = v => v;

const formatTypes = (types = {}) => Object.keys(types).reduce((obj, k) => {
  const type = getAsObject(types, k);
  const headers = getAsObject(type, 'headers');
  headers['Content-Type'] = headers['Content-Type'] || 'text/plain';
  const formatter = type.formatter || fn;
  return { ...obj, [k]: { headers, formatter } };
}, {});

class CoreConfig extends AbstractConfig {
  constructor(config = {}) {
    const { types } = config;
    super(config);
    this.config = {
      ...config,
      types: {
        ...formatTypes(defaultTypes),
        ...(types && formatTypes(types)),
      },
    };
  }
}

module.exports = CoreConfig;
