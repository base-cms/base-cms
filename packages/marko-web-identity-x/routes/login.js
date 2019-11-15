const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const query = gql`
  query AppUser($input: AppUserQueryInput!) {
    appUser(input: $input) {
      id
      email
      givenName
      familyName
    }
  }
`;

const createUser = gql`
  mutation CreateAppUser($input: CreateAppUserMutationInput!) {
    createAppUser(input: $input) {
      id
      email
      givenName
      familyName
    }
  }
`;

const sendLoginLink = gql`
  mutation SendLoginLink($input: SendAppUserLoginLinkMutationInput!) {
    sendAppUserLoginLink(input: $input)
  }
`;

const isMissingFields = (user, requiredFields) => requiredFields.some(field => !user[field]);

module.exports = asyncRoute(async (req, res) => {
  const { identityX, body } = req;
  // @todo this could come from the MW config??
  const {
    user,
    authUrl,
    requiredFields = [],
    redirectTo,
  } = body;
  const input = { email: user.email };
  const variables = { input };
  const { data } = await identityX.client.query({ query, variables });
  let { appUser } = data;

  if (!appUser) {
    // Create the user.
    appUser = await identityX.client.mutate({ mutation: createUser, variables: { input: user } });
  }

  if (isMissingFields({ ...appUser, ...user }, requiredFields)) {
    // Prompt for additional fields.
    res.json({ needsInput: true });
  } else {
    // Send login link.
    await identityX.client.mutate({
      mutation: sendLoginLink,
      variables: {
        input: {
          email: user.email,
          authUrl,
          redirectTo,
          fields: user,
        },
      },
    });
    res.json({ ok: true });
  }
});
