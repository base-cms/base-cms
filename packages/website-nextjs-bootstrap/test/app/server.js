const routeDefs = require('./routes');
const startServer = require('@base-cms/base4-website-nextjs/server');

const { log } = console;

const dir = './test/app';
const port = process.env.PORT || 3055;

startServer({ dir, routeDefs, port }).then(() => {
  log(`> Ready on http://localhost:${port}`);
}).catch((e) => {
  log(e.stack);
  process.exit(1);
});
