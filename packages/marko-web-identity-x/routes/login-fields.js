const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const { isArray } = Array;

const mutation = gql`
  mutation SetPreLoginFields($input: SetAppUserUnverifiedDataMutationInput!) {
    setAppUserUnverifiedData(input: $input) {
      id
    }
  }
`;

module.exports = asyncRoute(async (req, res) => {
  const { identityX, body } = req;
  const {
    email,
    values,
  } = body;

  const regionalConsentAnswers = isArray(values.regionalConsentAnswers)
    ? values.regionalConsentAnswers
    : [];

  const input = {
    ...values,
    regionalConsentAnswers: regionalConsentAnswers
      .map(answer => ({ policyId: answer.id, given: answer.given })),
    email,
  };
  await identityX.client.mutate({ mutation, variables: { input } });
  return res.json({ ok: true });
});
