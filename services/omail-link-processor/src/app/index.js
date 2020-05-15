const express = require('express');
const noCache = require('nocache');
const pkg = require('../../package.json');

const app = express();

app.disable('x-powered-by');
app.use(noCache());

app.get('/', (req, res) => {
  res.json({ [pkg.name]: pkg.version });
});

module.exports = app;
