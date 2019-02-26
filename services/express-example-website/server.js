const { startServer } = require('@base-cms/express-web');
const { GRAPHQL_URI, INTERNAL_PORT, EXTERNAL_PORT } = require('./env');
const pkg = require('./package.json');

const { log } = console;

process.on('unhandledRejection', (e) => {
  log('> Unhandled promise rejection. Throwing error...');
  throw e;
});

const onStart = async (app) => {
  // Manually add an index route, for now.
  app.get('/', (req, res) => {
    res.render('home');
  });
};

log(`> Booting ${pkg.name} ${pkg.version}...`);
startServer({
  graphqlUri: GRAPHQL_URI,
  port: INTERNAL_PORT,
  onStart,
}).then(() => {
  log(`> Ready on http://0.0.0.0:${EXTERNAL_PORT}`);
}).catch(e => setImmediate(() => { throw e; }));
