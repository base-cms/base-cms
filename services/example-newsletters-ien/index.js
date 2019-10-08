const newrelic = require('newrelic');
const { startServer } = require('@base-cms/marko-newsletters');
const coreConfig = require('./config/core');
const customConfig = require('./config/custom');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  customConfig,
  publicPath: 'public',
  onStart: app => app.set('trust proxy', 'loopback, linklocal, uniquelocal'),
  onAsyncBlockError: e => newrelic.noticeError(e),
}).then(() => log('Newsletters started!')).catch(e => setImmediate(() => { throw e; }));
