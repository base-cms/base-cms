const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

module.exports = app;
