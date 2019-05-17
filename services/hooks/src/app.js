const bodyParser = require('body-parser');
const express = require('express');
const { asyncRoute } = require('@base-cms/utils');
const getDB = require('./platform-history/utils/get-db');
const handle = require('./platform-history');

const app = express();
app.use(bodyParser.json());

app.post('/platform-history', asyncRoute(async (req, res) => {
  const { body } = req;
  const { stack, context_key: tenant, history } = body;
  const db = await getDB(stack, tenant);
  const result = await handle(db, history);
  res.json(result);
}));

module.exports = app;
