const deepAssign = require('deep-assign');

const inquirySubmission = require('./inquiry-submission');
const section = require('./section');
const site = require('./site');

module.exports = deepAssign(
  inquirySubmission,
  section,
  site,
);
