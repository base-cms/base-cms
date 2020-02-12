const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const query = gql`
  query LoginCheckAppUser($email: String!) {
    appUser(input: { email: $email }) {
      id
      email
    }
  }
`;

const createUser = gql`
  mutation LoginCreateAppUser($email: String!) {
    createAppUser(input: { email: $email }) {
      id
      email
    }
  }
`;

const sendLoginLink = gql`
  mutation LoginSendLoginLink($input: SendAppUserLoginLinkMutationInput!) {
    sendAppUserLoginLink(input: $input)
  }
`;

module.exports = asyncRoute(async (req, res) => {
  const { identityX, body } = req;
  const {
    email,
    authUrl,
    redirectTo,
  } = body;
  const variables = { email };
  const { data } = await identityX.client.query({ query, variables });
  let { appUser } = data;

  if (!appUser) {
    // Create the user.
    const { data: newUser } = await identityX.client.mutate({ mutation: createUser, variables });
    appUser = newUser.createAppUser;
  }

  // Send login link.
  await identityX.client.mutate({
    mutation: sendLoginLink,
    variables: {
      input: {
        email: appUser.email,
        authUrl,
        redirectTo,
      },
    },
  });
  res.json({ ok: true });
});
