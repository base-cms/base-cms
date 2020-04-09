const gql = require('graphql-tag');

module.exports = gql`
  fragment ContentInquiryFragment on Content {
    id
    name
    canonicalPath
    company {
      id
      name
      canonicalPath
    }
    ... on Inquirable {
      inquiryEmails
    }
  }
`;
