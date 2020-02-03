const newrelic = require('newrelic');
const { startServer } = require('@base-cms/export-framework');
const coreConfig = require('./config/core');
const customConfig = require('./config/custom');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  customConfig,
  onStart: app => app.set('trust proxy', 'loopback, linklocal, uniquelocal'),
  onAsyncBlockError: e => newrelic.noticeError(e),
}).then(() => log('Exports started!')).catch(e => setImmediate(() => { throw e; }));
