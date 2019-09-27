const gql = require('graphql-tag');
const context = require('./context');
const inquirySubmission = require('./inquiry-submission');
const option = require('./option');
const section = require('./section');
const site = require('./site');

module.exports = gql`

${context}
${inquirySubmission}
${option}
${section}
${site}

`;
