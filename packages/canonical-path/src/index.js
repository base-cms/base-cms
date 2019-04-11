const platformContent = require('./platform/content');
const websiteSection = require('./website/section');
const requestParser = require('./request-parser');

module.exports = {
  platformContent,
  websiteSection,
  requestParser,

  // @todo update refs to these to remove them: BC break, minor this package
  content: platformContent,
  section: websiteSection,
};
