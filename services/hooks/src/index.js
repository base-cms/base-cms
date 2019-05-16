const express = require('express');
const bodyParser = require('body-parser');

const { log } = console;

const app = express();
app.use(bodyParser.json());

app.post('/platform-history', (req, res) => {
  log(req.body);
  res.json(req.body);
});

app.listen(80, () => log('> Ready on http://0.0.0.0:10012'));
