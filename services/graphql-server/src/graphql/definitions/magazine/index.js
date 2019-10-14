const gql = require('graphql-tag');
const issue = require('./issue');
const publication = require('./publication');
const schedule = require('./schedule');
const section = require('./section');

module.exports = gql`

${issue}
${publication}
${schedule}
${section}

`;
