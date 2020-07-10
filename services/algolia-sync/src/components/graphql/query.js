const createClient = require('./create-client');
require('dotenv').config();

const queryFromBase = async (query, tenantKey, input) => {
  const context = {
    headers: {
      'x-tenant-key': tenantKey,
      'x-cdn-image-hostname': 'base.imgix.net',
    },
  };

  try {
    const apollo = createClient(process.env.GRAPHQL_URI);
    const variables = { input };
    const contents = await apollo.query({ query, variables, context });
    return contents.data;
  } catch (e) {
    throw (e);
  }
};

module.exports = { queryFromBase };
