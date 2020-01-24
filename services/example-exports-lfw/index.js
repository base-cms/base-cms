const newrelic = require('newrelic');
const { startServer } = require('@base-cms/export-framework');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  publicPath: 'public',
  onStart: app => app.set('trust proxy', 'loopback, linklocal, uniquelocal'),
  onAsyncBlockError: e => newrelic.noticeError(e),
}).then(() => log('Exports started!')).catch(e => setImmediate(() => { throw e; }));
