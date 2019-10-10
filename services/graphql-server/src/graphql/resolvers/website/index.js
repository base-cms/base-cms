const deepAssign = require('deep-assign');

const inquirySubmission = require('./inquiry-submission');
const schedule = require('./schedule');
const section = require('./section');
const site = require('./site');

module.exports = deepAssign(
  inquirySubmission,
  schedule,
  section,
  site,
);
