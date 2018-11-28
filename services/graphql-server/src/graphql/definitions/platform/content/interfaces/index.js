const gql = require('graphql-tag');
const authorable = require('./authorable');
const contactable = require('./contactable');
const content = require('./content');

module.exports = gql`

${authorable}
${contactable}
${content}

`;
