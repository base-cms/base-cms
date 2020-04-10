const gql = require('graphql-tag');

module.exports = gql`
  fragment MarkoWebInquiryFragment on Content {
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
