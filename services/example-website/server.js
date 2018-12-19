const startServer = require('@base-cms/nextjs-web/server');
const pkg = require('./package.json');
const routeDefs = require('./site/routes');

const { log } = console;

const dir = './site';
// @todo These should be env values.
const port = 10003;
const serviceUrl = 'https://graphql.officer.com';

const boot = async () => {
  await startServer({
    dir,
    port,
    routeDefs,
    serviceUrl,
  });
  log(`> Ready on http://0.0.0.0:${port}`);
};

log(`> Booting ${pkg.name} ${pkg.version}...`);
boot().catch(e => setImmediate(() => { throw e; }));
