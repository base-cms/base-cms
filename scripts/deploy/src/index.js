const Rancher = require('./rancher');
const pkg = require('../package.json');

const {
  RANCHER_URI,
  RANCHER_ACCESS_KEY,
  RANCHER_SECRET_KEY,
  SERVICE_TARGET,
  IMAGE_NAME,
  TRAVIS_TAG,
} = require('./env');

const { log } = console;

const api = new Rancher({
  uri: RANCHER_URI,
  accessKey: RANCHER_ACCESS_KEY,
  secretKey: RANCHER_SECRET_KEY,
});

const doUpgrade = async service => api.upgradeService({
  service,
  finish: true,
  image: `${IMAGE_NAME}:${TRAVIS_TAG}`,
});

const run = async () => {
  log(`> Finding services with label "service=${SERVICE_TARGET}"`);
  const services = await api.findServicesByTag({ service: SERVICE_TARGET });

  log(`> Found ${services.length} services to upgrade.`);
  log('> Starting service upgrades.');
  await Promise.all(services.map(service => doUpgrade(service)))
    .then(() => log('> Upgrades complete.'));
  log('> Run completed.\n');
};

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

log(`> Booting ${pkg.name} v${pkg.version}...\n`);
run().catch(e => setImmediate(() => { throw e; }));
