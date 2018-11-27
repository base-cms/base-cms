const gql = require('graphql-tag');
const authorable = require('./authorable');
const content = require('./content');

module.exports = gql`

${authorable}
${content}

`;
