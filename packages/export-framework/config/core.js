const { getAsObject } = require('@base-cms/object-path');
const AbstractConfig = require('./abstract-config');

const defaults = {
  csv: {},
  json: { 'Content-Type': 'application/json' },
  txt: {},
};

const formatTypes = (types = {}) => Object.keys(types).reduce((obj, k) => {
  const headers = getAsObject(types, k);
  headers['Content-Type'] = headers['Content-Type'] || 'text/plain';
  return { ...obj, [k]: headers };
}, {});

class CoreConfig extends AbstractConfig {
  constructor(config = {}) {
    const { typeHeaders } = config;
    super(config);
    this.config = {
      ...config,
      typeHeaders: {
        ...formatTypes(defaults),
        ...(typeHeaders && formatTypes(typeHeaders)),
      },
    };
  }
}

module.exports = CoreConfig;
