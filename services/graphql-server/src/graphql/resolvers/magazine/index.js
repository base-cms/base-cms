const deepAssign = require('deep-assign');

const issue = require('./issue');
const publication = require('./publication');
const schedule = require('./schedule');
const section = require('./section');

module.exports = deepAssign(
  issue,
  publication,
  schedule,
  section,
);
