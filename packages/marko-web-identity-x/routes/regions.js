const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const localeRegions = gql`
  query localeRegions {
    localeRegions {
      id
      code
      name
      country {
        id
      }
    }
  }
`;

module.exports = asyncRoute(async (req, res) => {
  const { identityX } = req;
  const { data } = await identityX.client.query({ query: localeRegions });
  res.json(data.localeRegions);
});
