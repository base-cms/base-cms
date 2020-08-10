const gql = require('graphql-tag');
const newsletter = require('./newsletter');
const schedule = require('./schedule');
const section = require('./section');

module.exports = gql`

${newsletter}
${schedule}
${section}

`;
