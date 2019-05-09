const gql = require('graphql-tag');
const addressable = require('./addressable');
const authorable = require('./authorable');
const contactable = require('./contactable');
const content = require('./content');
const media = require('./media');
const socialLinkable = require('./social-linkable');

module.exports = gql`

${addressable}
${authorable}
${contactable}
${content}
${media}
${socialLinkable}

`;
