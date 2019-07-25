const gql = require('graphql-tag');
const inquirySubmission = require('./inquiry-submission');
const option = require('./option');
const section = require('./section');
const site = require('./site');

module.exports = gql`

${inquirySubmission}
${option}
${section}
${site}

`;
