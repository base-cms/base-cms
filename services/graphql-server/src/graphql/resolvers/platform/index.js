const deepAssign = require('deep-assign');

const asset = require('./asset');
const content = require('./content');
const inquirySubmission = require('./inquiry-submission');

module.exports = deepAssign(
  asset,
  content,
  inquirySubmission,
);
