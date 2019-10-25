const { service } = require('@base-cms/micro');

const { name, version } = require('../package.json');
const { connect, ping } = require('./mongodb');
const actions = require('./actions');

const { log } = console;

module.exports = service.json({
  init: async () => {
    log(`> Booting ${name} ${version}...`);
    log('> Connecting to MongoDB...');
    await connect();
  },
  ping,
  actions,
});
