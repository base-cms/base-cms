const { isObject } = require('@base-cms/utils');
const fetch = require('node-fetch');
const createHeaders = require('../utils/create-headers');

module.exports = async ({
  uri,
  placementId,
  opts,
  req,
}) => {
  const query = isObject(opts) ? `?opts=${encodeURIComponent(JSON.stringify(opts))}` : '';
  const url = `${uri}/placement/elements/${placementId}.json${query}`;
  const response = await fetch(url, { headers: createHeaders({ req }) });
  const json = await response.json();
  if (!response.ok) {
    const err = new Error(response.statusMessage);
    err.statusCode = response.statusText;
    err.body = json;
    throw err;
  }
  return json;
};
