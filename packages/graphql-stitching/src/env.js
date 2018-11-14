const { envalid } = require('@base-cms/tooling');

const {
  custom,
  json,
  cleanEnv,
} = envalid;
const { url, nonemptystr } = custom;

module.exports = cleanEnv(process.env, {
  BASECMS_GRAPHQL_URL: url({ desc: 'The BaseCMS GraphQL URL for stitching API requests.' }),
  BASECMS_TENANT_KEY: nonemptystr({ desc: 'The BaseCMS tenant key to connect to.' }),
  BASECMS_API_TOKEN: nonemptystr({ desc: 'The BaseCMS GraphQL API token.' }),
  BASECMS_CONTENT_CANONICAL_PATHS: json({
    desc: 'A JSON array of content canonical path parts for generating content URLs',
    default: '["sectionAlias", "type", "id", "slug"]',
  }),
});
