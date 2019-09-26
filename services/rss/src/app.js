const express = require('express');
const helmet = require('helmet');
const { apollo, websiteContext } = require('./middleware');
// const routes = require('./routes');

const app = express();

app.use(helmet());
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

app.use(apollo());
app.use(websiteContext());
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex');
  next();
});

app.get('/', (req, res) => {
  res.json(res.locals.websiteContext);
});

// routes(app);

module.exports = app;
