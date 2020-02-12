const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');
const userFragment = require('../api/fragments/active-user');

const mutation = gql`
  mutation UpdateUserProfile($input: UpdateOwnAppUserMutationInput!) {
    updateOwnAppUser(input: $input) {
      ...ActiveUserFragment
    }
  }

  ${userFragment}
`;

module.exports = asyncRoute(async (req, res) => {
  const { identityX, body } = req;
  const {
    givenName,
    familyName,
    organization,
    organizationTitle,
    countryCode,
    regionCode,
    postalCode,
  } = body;
  const input = {
    givenName,
    familyName,
    organization,
    organizationTitle,
    countryCode,
    regionCode,
    postalCode,
  };
  const { data } = await identityX.client.mutate({ mutation, variables: { input } });
  res.json({ ok: true, user: data.updateOwnAppUser });
});
