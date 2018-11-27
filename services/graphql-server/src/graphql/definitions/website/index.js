const gql = require('graphql-tag');
const option = require('./option');
const section = require('./section');
const site = require('./site');

module.exports = gql`

${option}
${section}
${site}

`;
