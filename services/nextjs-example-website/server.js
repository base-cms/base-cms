const startServer = require('@base-cms/nextjs-web/server');
const pkg = require('./package.json');
const routeDefs = require('./site/routes');

const { log } = console;

const dir = './site';
const port = 80;
const { SERVICE_URL } = process.env;

const boot = async () => {
  await startServer({
    dir,
    port,
    routeDefs,
    serviceUrl: SERVICE_URL,
  });
  log(`> Ready on http://0.0.0.0:${port}`);
};

log(`> Booting ${pkg.name} ${pkg.version}...`);
boot().catch(e => setImmediate(() => { throw e; }));
