const envalid = require('@base-cms/env');

const {
  validators,
  cleanEnv,
} = envalid;
const { nonemptystr } = validators;

module.exports = cleanEnv(process.env, {
  GRAPHQL_URI: nonemptystr({ desc: 'The BaseCMS GraphQL API URL.' }),
  ALGOLIA_SQS_URI: nonemptystr({ desc: 'The AWS SQS URL.' }),
  ALGOLIA_APPID: nonemptystr({ desc: 'Algolia API APPID' }),
  ALGOLIA_API_KEY: nonemptystr({ desc: 'Algolia API Key' }),
  AWS_ACCESS_KEY_ID: nonemptystr({ desc: 'AWS Access Key' }),
  AWS_SECRET_ACCESS_KEY: nonemptystr({ desc: 'AWS Secret' }),
  AWS_REGION: nonemptystr({ desc: 'AWS Region', default: 'us-east-1' }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'Newrelic License key' }),
});
