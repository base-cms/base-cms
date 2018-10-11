const startServer = require('@base-cms/base4-website-nextjs/server');

const { log } = console;

const dir = './site';
const port = process.env.PORT || 3033;

startServer({ dir, port }).then(() => {
  log(`> Ready on http://localhost:${port}`);
}).catch((e) => {
  log(e.stack);
  process.exit(1);
});
