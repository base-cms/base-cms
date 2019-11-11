const { service } = require('@base-cms/micro');
const newrelic = require('./newrelic');

const { name, version } = require('../package.json');
const { connect, ping } = require('./mongodb');
const actions = require('./actions');
const { onError } = require('./utils');

const { log } = console;

process.on('unhandledRejection', (e) => {
  newrelic.noticeError(e);
  throw e;
});

module.exports = service.json({
  init: async () => {
    log(`> Booting ${name} ${version}...`);
    log('> Connecting to MongoDB...');
    const connection = await connect();
    // Ensure the TTL index is present
    await connection.db('google-data-api').createIndex('responses', { expires: 1 }, { background: true, expireAfterSeconds: 0 });
  },
  ping,
  onError,
  actions,
});
