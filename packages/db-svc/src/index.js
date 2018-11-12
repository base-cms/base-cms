const { ServiceBroker } = require('moleculer');
const actions = require('./actions');
const base = require('./base');
const { NATS_DSN, NATS_LOGLEVEL } = require('./env');
const { name, version } = require('../package.json');

const { log } = console;

const broker = new ServiceBroker({
  namespace: 'base-cms',
  transporter: NATS_DSN,
  logLevel: NATS_LOGLEVEL,
  logFormatter: 'simple',
});

broker.createService({
  name,
  version,
  actions,
});

const run = async () => {
  log(`Starting '${name}' v${version} ...`);
  const db = await base.connect();
  log(`BaseCMS DB connected to ${db.s.url}`);
  await broker.start();
  log('> Service ready');
};
run().catch(e => setImmediate(() => { throw e; }));
