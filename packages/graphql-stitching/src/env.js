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
  BASECMS_GRAPHQL_URL: url({ desc: 'The BaseCMS GraphQL URL for stitching API requests.' }),
  BASECMS_TENANT_KEY: nonemptystr({ desc: 'The BaseCMS tenant key to connect to.' }),
  BASECMS_API_TOKEN: nonemptystr({ desc: 'The BaseCMS GraphQL API token.' }),
  BASECMS_CONTENT_CANONICAL_PATHS: json({
    desc: 'A JSON array of content canonical path parts for generating content URLs',
    default: '["sectionAlias", "type", "id", "slug"]',
  }),
});
