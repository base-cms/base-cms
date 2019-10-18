const gql = require('graphql-tag');

module.exports = gql`

fragment RSSItemContentFragment on Content {
  id
  name
  teaser(input: { useFallback: false, maxLength: null })
  siteContext {
    url
  }
  publishedDate(input: { format: "ddd, DD MMM YYYY HH:mm:ss ZZ" })
  primarySection {
    id
    alias
    name
    fullName
  }
  ... on Authorable {
    authors(input: { pagination: { limit: 1 } }) {
      edges {
        node {
          id
          firstName
          lastName
          publicEmail
        }
      }
    }
  }
}

`;
