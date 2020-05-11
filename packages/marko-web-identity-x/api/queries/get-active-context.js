const gql = require('graphql-tag');
const userFragment = require('../fragments/active-user');

module.exports = gql`

query GetActiveAppContext {
  activeAppContext {
    application {
      id
      name
      organization {
        id
        name
        consentPolicy
        emailConsentRequest
        regionalConsentPolicies(input: { status: enabled }) {
          id
          message
          countries {
            id
          }
          required
        }
      }
    }
    user {
      ...ActiveUserFragment
    }
    mergedTeams {
      id
      name
      photoURL
    }
    mergedAccessLevels {
      id
      name
    }
    hasTeams
    hasUser
  }
}

${userFragment}

`;
