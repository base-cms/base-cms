const { asyncRoute } = require('@base-cms/utils');
const fetch = require('node-fetch');
const moment = require('moment');
const pretty = require('pretty');
const httpError = require('../utils/http-error');
const pkg = require('../../package.json');
const processOmedaLinks = require('../process-links');

module.exports = () => asyncRoute(async (req, res) => {
  const {
    protocol = 'https',
    host,
    alias,
    day,
    tenantKey,
    exHost,
  } = req.query;
  if (!host || !alias) throw httpError(400, 'The `host` and `alias` parameters are required.');
  if (!tenantKey) throw httpError(400, 'The `tenantKey` parameter is required.');
  if (!exHost) throw httpError(400, 'The `exHost` parameter is required.');

  let url = `${protocol}://${host}/${alias}`;
  if (day) {
    const date = moment(day);
    if (!date.isValid()) throw httpError(400, `The day value of ${day} is invalid.`);
    url = `${url}/${date.format('YYYY/MM/DD')}`;
  }
  const response = await fetch(url, {
    headers: { 'user-agent': `${pkg.name}/${pkg.version}` },
  });
  const html = await response.text();
  const out = await processOmedaLinks({
    html: Object.hasOwnProperty.call(req.query, 'pretty') ? pretty(html, { ocd: true }) : html,
    tenantKey,
    exHost,
  });
  res.status(response.status).send(out);
});
