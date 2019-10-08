const gql = require('graphql-tag');
const inquirySubmission = require('./inquiry-submission');
const option = require('./option');
const schedule = require('./schedule');
const section = require('./section');
const site = require('./site');

module.exports = gql`

${inquirySubmission}
${option}
${schedule}
${section}
${site}

`;
