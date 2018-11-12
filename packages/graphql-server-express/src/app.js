const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const stoppable = require('stoppable');
const routes = require('./routes');

const app = express();
const CORS = cors();

app.use(helmet());
app.use(CORS);
app.options('*', CORS);

routes(app);

module.exports = (...args) => new Promise((resolve, reject) => {
  const server = app.listen(...args);
  server.on('error', (e => reject(e)));
  server.on('listening', () => resolve(stoppable(server, 1000)));
});
