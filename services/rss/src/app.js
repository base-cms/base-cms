const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

routes(app);

module.exports = app;
