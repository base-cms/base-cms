const createClient = require('./create-client');
const { GRAPHQL_URI } = require('../../env');

const queryFromBase = async (query, tenantKey, input) => {
  const context = {
    headers: {
      'x-tenant-key': tenantKey,
    },
  };

  const apollo = createClient(GRAPHQL_URI);
  const variables = { input };
  const contents = await apollo.query({ query, variables, context });
  return contents.data;
};

module.exports = { queryFromBase };
