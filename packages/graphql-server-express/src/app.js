const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const CORS = cors();

app.use(helmet());
app.use(CORS);
app.options('*', CORS);

module.exports = app;
