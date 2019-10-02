const gql = require('graphql-tag');

module.exports = gql`

fragment BlockNewsletterScheduledContentFragment on Content {
  id
  type
  name(input: { mutation: Email })
  websiteUrl
}

`;
