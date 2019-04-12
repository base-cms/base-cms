const deepAssign = require('deep-assign');

const issue = require('./issue');
const publication = require('./publication');

module.exports = deepAssign(
  issue,
  publication,
);
