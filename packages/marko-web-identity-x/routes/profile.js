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

const customFieldsMutation = gql`
  mutation SetAppUserCustomSelectFields($input: UpdateOwnAppUserCustomSelectAnswersMutationInput!) {
    updateOwnAppUserCustomSelectAnswers(input: $input) {
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
    customSelectFieldAnswers,
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

  if (customSelectFieldAnswers.length) {
    // only update custom questions when there some :)
    const customFieldsInput = customSelectFieldAnswers.map(fieldAnswer => ({
      fieldId: fieldAnswer.field.id,
      optionIds: fieldAnswer.answers.map(({ id }) => id),
    }));
    await identityX.client.mutate({
      mutation: customFieldsMutation,
      variables: { input: { answers: customFieldsInput } },
    });
  }

  const { data } = await identityX.client.mutate({ mutation, variables: { input } });
  res.json({ ok: true, user: data.updateOwnAppUser });
});
