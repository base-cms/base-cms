const { Client } = require('./mongodb');

const defaults = {
  bufferMaxEntries: 0,
  connectTimeoutMS: 200,
  ignoreUndefined: true,
  reconnectInterval: 200, // only affects single server connects
  reconnectTries: 15, // only affects single server connects
  useNewUrlParser: true,
};

module.exports = (dsn, options = {}) => new Client(dsn, { ...defaults, ...options });
