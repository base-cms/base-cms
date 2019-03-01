const { isFunction: isFn, cleanPath } = require('@base-cms/utils');
const { createTitle, createDescription } = require('../../utils/website-section');

const pathResolvers = {
  alias: section => section.alias,
};

module.exports = {
  /**
   *
   */
  WebsiteSection: {
    canonicalPath: async (section, _, ctx) => {
      const { canonicalRules } = ctx;
      const { websiteSection: sectionRules } = canonicalRules;
      const { parts, prefix } = sectionRules;

      const values = await Promise.all(parts.map((key) => {
        const fn = pathResolvers[key];
        return isFn(fn) ? fn(section, ctx) : section[key];
      }));

      const path = cleanPath(values.filter(v => v).map(v => String(v).trim()).join('/'));
      if (!path || path === 'home') return '/';
      if (prefix) return `/${cleanPath(prefix)}/${path}`;
      return `/${path}`;
    },

    /**
     * Placeholder.
     * Used for consistency with content.
     */
    redirectTo: () => null,

    metadata: section => ({
      title: () => createTitle(section),
      description: () => createDescription(section),
    }),
  },
};
