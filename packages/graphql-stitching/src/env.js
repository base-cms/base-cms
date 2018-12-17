const { envalid } = require('@base-cms/tooling');

const {
  custom,
  json,
  cleanEnv,
} = envalid;
const { url } = custom;

module.exports = cleanEnv(process.env, {
  GRAPHQL_URL: url({ desc: 'The BaseCMS GraphQL URL for stitching API requests.' }),
  CONTENT_CANONICAL_PATHS: json({
    desc: 'A JSON array of content canonical path parts for generating content URLs',
    default: '["sectionAlias", "type", "id", "slug"]',
  }),
});
