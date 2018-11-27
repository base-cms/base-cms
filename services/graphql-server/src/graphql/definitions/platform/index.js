const gql = require('graphql-tag');
const asset = require('./asset');
const content = require('./content');
const security = require('./security');
const taxonomy = require('./taxonomy');

module.exports = gql`

type PlatformStubExternal {
  identifier: String
  identifiers: [String]! @arrayValue
  namespace: String
  url: String
}

${asset}
${content}
${security}
${taxonomy}

`;
