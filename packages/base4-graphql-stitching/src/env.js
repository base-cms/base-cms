const { isURL } = require('validator');
const { cleanEnv, makeValidator, json } = require('envalid');

const url = makeValidator((v) => {
  const opts = { protocols: ['http', 'https'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a valid URL with http or https');
});

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  BASE4_GRAPHQL_URL: url({ desc: 'The Base4 GraphQL URL for stitching API requests.' }),
  BASE4_TENANT_KEY: nonemptystr({ desc: 'The Base4 tenant key to connect to.' }),
  BASE4_API_TOKEN: nonemptystr({ desc: 'The Base4 GraphQL API token.' }),
  BASE4_CONTENT_CANONICAL_PATHS: json({
    desc: 'A JSON array of content canonical path parts for generating content URLs',
    default: ['sectionAlias', 'type', 'id', 'slug'],
  }),
});
