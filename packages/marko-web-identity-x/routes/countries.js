const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const localeCountries = gql`
  query LocaleCountries {
    localeCountries {
      id
      name
      flag
    }
  }
`;

module.exports = asyncRoute(async (req, res) => {
  const { identityX } = req;
  const { data } = await identityX.client.query({ query: localeCountries });
  res.json(data.localeCountries);
});
