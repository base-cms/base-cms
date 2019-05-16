const bodyParser = require('body-parser');
const express = require('express');

const { log } = console;

const app = express();
app.use(bodyParser.json());

app.post('/platform-history', (req, res) => {
  log(req.body);
  res.json(req.body);
});

module.exports = app;
