const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const query = gql`
  query AppUser($input: AppUserQueryInput!) {
    appUser(input: $input) {
      id
      email
      givenName
      familyName
      organization
      organizationTitle
      countryCode
      regionCode
      postalCode
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
      organization
      organizationTitle
      countryCode
      regionCode
      postalCode
    }
  }
`;

const sendLoginLink = gql`
  mutation SendLoginLink($input: SendAppUserLoginLinkMutationInput!) {
    sendAppUserLoginLink(input: $input)
  }
`;

const getMissingFields = (user, requiredFields) => requiredFields.filter(field => !user[field]);

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
    const { data: newUserData } = await identityX.client.mutate({
      mutation: createUser, variables: { input: user },
    });
    appUser = newUserData.createAppUser;
  }

  const missingFields = getMissingFields({ ...appUser, ...user }, requiredFields);
  if (missingFields.length) {
    // Prompt for additional fields.
    res.json({ needsInput: true, appUser });
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
