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

const consentAnswers = gql`
  mutation SetAppUserRegionalConsent($input: SetAppUserRegionalConsentMutationInput!) {
    setAppUserRegionalConsent(input: $input) {
      id
    }
  }
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
    receiveEmail,
    regionalConsentAnswers,
  } = body;
  const input = {
    givenName,
    familyName,
    organization,
    organizationTitle,
    countryCode,
    regionCode,
    postalCode,
    receiveEmail,
  };

  const answers = regionalConsentAnswers
    .map(answer => ({ policyId: answer.id, given: answer.given }));

  if (answers.length) {
    await identityX.client.mutate({ mutation: consentAnswers, variables: { input: { answers } } });
  }

  const { data } = await identityX.client.mutate({ mutation, variables: { input } });
  res.json({ ok: true, user: data.updateOwnAppUser });
});
