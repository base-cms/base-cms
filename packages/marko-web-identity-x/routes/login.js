const gql = require('graphql-tag');
const { asyncRoute } = require('@base-cms/utils');

const { isArray } = Array;

const buildQuery = ({ fields = [] }) => gql`
  query LoginCheckAppUser($email: String!) {
    appUser(input: { email: $email }) {
      id
      email
      verified
      # add unique set of required fields
      ${fields.join('\n')}
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

const validFields = {
  givenName: true,
  familyName: true,
  organization: true,
  organizationTitle: true,
  countryCode: true,
  regionCode: true,
  postalCode: true,
};

module.exports = asyncRoute(async (req, res) => {
  const { identityX, body } = req;
  const {
    email,
    authUrl,
    redirectTo,
    appContextId,
  } = body;
  let requiredFields = isArray(body.requiredFields)
    ? body.requiredFields.filter(field => validFields[field])
    : [];
  // region code must be required if postal code is
  if (requiredFields.includes('postalCode')) requiredFields.push('regionCode');
  // country code must be required if region code is
  if (requiredFields.includes('regionCode')) requiredFields.push('countryCode');
  // ensure fields are unique
  requiredFields = [...new Set(requiredFields)];

  const variables = { email };
  const query = buildQuery({ fields: requiredFields });
  const { data } = await identityX.client.query({ query, variables });
  let { appUser } = data;

  if (!appUser) {
    // Create the user.
    const { data: newUser } = await identityX.client.mutate({ mutation: createUser, variables });
    appUser = newUser.createAppUser;
  }

  // Don't require regionCode if not supported based on country selection
  if (appUser.countryCode) {
    if (!['US', 'CA', 'MX'].includes(appUser.countryCode)) {
      requiredFields = requiredFields.filter(item => item !== 'regionCode');
    }
  }

  // determine if the user is missing fields that are required before sending the login link
  // this only applies when the user is _not_ verified
  const { verified } = appUser;
  if (!verified) {
    const hasRequiredFields = requiredFields.every(field => appUser[field]);
    if (!hasRequiredFields) return res.json({ hasRequiredFields, requiredFields });
  }

  // Send login link.
  await identityX.client.mutate({
    mutation: sendLoginLink,
    variables: {
      input: {
        email: appUser.email,
        authUrl,
        redirectTo,
        appContextId,
      },
    },
  });
  return res.json({ ok: true, hasRequiredFields: true, requiredFields: [] });
});
