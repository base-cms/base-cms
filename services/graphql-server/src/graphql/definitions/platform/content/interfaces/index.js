const gql = require('graphql-tag');
const addressable = require('./addressable');
const authorable = require('./authorable');
const contactable = require('./contactable');
const content = require('./content');
const inquirable = require('./inquirable');
const media = require('./media');
const organizationContactable = require('./organization-contactable');
const socialLinkable = require('./social-linkable');

module.exports = gql`

${addressable}
${authorable}
${contactable}
${content}
${inquirable}
${media}
${organizationContactable}
${socialLinkable}

`;
