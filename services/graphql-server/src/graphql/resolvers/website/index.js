const deepAssign = require('deep-assign');

const context = require('./context');
const inquirySubmission = require('./inquiry-submission');
const section = require('./section');
const site = require('./site');

module.exports = deepAssign(
  context,
  inquirySubmission,
  section,
  site,
);
