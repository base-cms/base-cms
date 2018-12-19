const { createTitle, createDescription } = require('../../utils/website-section');

module.exports = {
  /**
   *
   */
  WebsiteSection: {
    metadata: section => ({
      title: () => createTitle(section),
      description: () => createDescription(section),
    }),
  },
};
