const bodyParser = require('body-parser');
const express = require('express');
const { asyncRoute } = require('@base-cms/utils');
const basedb = require('./basedb');
const handle = require('./platform-history');

const app = express();
app.use(bodyParser.json());

app.post('/platform-history', asyncRoute(async (req, res) => {
  const { body } = req;
  const { stack, context_key: tenant, history } = body;
  if (!tenant) throw new Error('No context_key (tenant) was provided.');
  const db = basedb(tenant)[stack];
  if (!db) throw new Error(`No database found for '${stack}'`);

  const exists = await db.tenantExists();
  if (!exists) throw new Error(`The tenant '${tenant}' was not found on stack '${stack}'`);

  const result = await handle(db, history);
  res.json(result);
}));

module.exports = app;
