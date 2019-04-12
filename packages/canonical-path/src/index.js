const content = require('./platform/content');
const websiteSection = require('./website/section');
const requestParser = require('./request-parser');
const magazineIssue = require('./magazine/issue');
const magazinePublication = require('./magazine/publication');

module.exports = {
  requestParser,
  magazineIssue,
  magazinePublication,
  content,
  websiteSection,
};
