const gql = require('graphql-tag');
const campaign = require('./campaign');
const newsletter = require('./newsletter');
const schedule = require('./schedule');
const section = require('./section');

module.exports = gql`

${campaign}
${newsletter}
${schedule}
${section}

`;
