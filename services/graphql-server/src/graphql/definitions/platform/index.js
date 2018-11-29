const gql = require('graphql-tag');
const asset = require('./asset');
const entity = require('./entity');
const content = require('./content');
const security = require('./security');
const taxonomy = require('./taxonomy');

module.exports = gql`

type StubExternal {
  identifier: String
  identifiers: [String]! @arrayValue
  namespace: String
  url: String
}

${asset}
${entity}
${content}
${security}
${taxonomy}

`;
