const newrelic = require('newrelic');
const { startServer } = require('@base-cms/marko-newsletters');
const { version } = require('./package.json');
// const routes = require('./server/routes');
const coreConfig = require('./config/core');
const customConfig = require('./config/custom');

const { log } = console;

module.exports = startServer({
  rootDir: __dirname,
  coreConfig,
  customConfig,
  routes: app => app.get('/', (req, res) => {
    res.json({ hello: 'world' });
  }),
  version,
  publicPath: 'public',
  onStart: app => app.set('trust proxy', 'loopback, linklocal, uniquelocal'),
  onAsyncBlockError: e => newrelic.noticeError(e),
}).then(() => log('Newsletters started!')).catch(e => setImmediate(() => { throw e; }));
