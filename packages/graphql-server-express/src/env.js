const { str, cleanEnv, port } = require('envalid');

module.exports = cleanEnv(process.env, {
  BASECMS_MONGODB_URL: str({ desc: 'The BaseCMS MongoDB server URL.' }),
  BASECMS_GRAPHQL_PORT: port({ desc: 'The port to run the GraphQL server on.', default: 6915 }),
  BASECMS_GRAPHQL_HOST: str({ desc: 'The host to run the GraphQL server on.', default: 'localhost' }),
});
