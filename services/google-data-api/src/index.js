require('./newrelic');
const { service } = require('@base-cms/micro');
const newrelic = require('./newrelic');
const { PORT, EXPOSED_PORT } = require('./env');
const pkg = require('../package.json');
const { connect, ping } = require('./mongodb');
const actions = require('./actions');

const { log } = console;

process.on('unhandledRejection', (e) => {
  newrelic.noticeError(e);
  throw e;
});

service.jsonServer({
  actions,
  onStart: async () => {
    log(`> Booting ${pkg.name} v${pkg.version}...`);
    log('> Connecting to MongoDB...');
    const connection = await connect();
    await connection.db('google-data-api').createIndex('responses', { expires: 1 }, { background: true, expireAfterSeconds: 0 });
  },
  onHealthCheck: ping,
  onError: newrelic.noticeError,
  port: PORT,
  exposedPort: EXPOSED_PORT,
}).catch(e => setImmediate(() => {
  newrelic.noticeError(e);
  throw e;
}));
