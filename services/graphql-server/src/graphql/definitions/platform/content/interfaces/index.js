const gql = require('graphql-tag');
const addressable = require('./addressable');
const authorable = require('./authorable');
const contactable = require('./contactable');
const content = require('./content');
const gateable = require('./gateable');
const media = require('./media');

module.exports = gql`

${addressable}
${authorable}
${contactable}
${content}
${gateable}
${media}

`;
