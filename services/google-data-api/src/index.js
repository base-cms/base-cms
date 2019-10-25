const { service } = require('@base-cms/micro');

const { name, version } = require('../package.json');
const { connect, ping } = require('./mongodb');
const actions = require('./actions');
const { onError } = require('./utils');

const { log } = console;

process.on('unhandledRejection', (e) => { throw e; });

module.exports = service.json({
  init: async () => {
    log(`> Booting ${name} ${version}...`);
    log('> Connecting to MongoDB...');
    await connect();
  },
  ping,
  onError,
  actions,
});
