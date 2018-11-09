const startServer = require('@base-cms/website-nextjs/server');
const routeDefs = require('../site/routes');

const { log } = console;

const dir = './site';
const port = process.env.PORT || 3033;

startServer({ dir, routeDefs, port }).then(() => {
  log(`> Ready on http://localhost:${port}`);
}).catch((e) => {
  log(e.stack);
  process.exit(1);
});
