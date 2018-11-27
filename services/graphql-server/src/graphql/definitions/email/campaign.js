const gql = require('graphql-tag');

module.exports = gql`

type EmailCampaignTestRecipient {
  firstName: String
  lastName: String
  email: String
}

`;
