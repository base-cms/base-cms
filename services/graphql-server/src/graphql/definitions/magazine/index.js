const gql = require('graphql-tag');
const issue = require('./issue');
const publication = require('./publication');
const section = require('./section');

module.exports = gql`

${issue}
${publication}
${section}

`;
