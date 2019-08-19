const gql = require('graphql-tag');

module.exports = gql`

fragment WithContentFragment on Content {
  id
  type
  redirectTo
  canonicalPath
  metadata {
    title
    description
    publishedDate
    updatedDate
    expiresDate
    image {
      id
      src(input: { options: { auto: "format", w: "1200", fit: "max" } })
    }
  }
}

`;
