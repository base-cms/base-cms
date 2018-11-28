const { UserInputError } = require('apollo-server-express');
const pathResolvers = require('../../utils/content-path-resolvers');
const { createTitle, createDescription } = require('../../utils/content');

module.exports = {
  /**
   *
   */
  Content: {
    /**
     *
     */
    __resolveType(obj) {
      return `Content${obj.type}`;
    },

    canonicalPath: async (content, _, ctx) => {
      const { contentPaths } = ctx;
      if (!contentPaths.includes('id')) {
        throw new UserInputError('The canonicalPath arguments must at least contain "id"', {
          invalidArgs: contentPaths,
        });
      }
      const { type, linkUrl } = content;
      const types = ['Promotion', 'TextAd'];
      if (types.includes(type) && linkUrl) return linkUrl;

      const values = await Promise.all(contentPaths.map((key) => {
        const fn = pathResolvers[key];
        return typeof fn === 'function' ? fn(content, ctx) : content[key];
      }));

      const path = values.filter(v => v).join('/');
      if (!path) return '';
      return `/${path}`;
    },

    metadata: async (content, _, { basedb }) => ({
      title: await createTitle(content, basedb),
      description: createDescription(content),
    }),

    redirectTo: (content) => {
      const { type, linkUrl } = content;

      const types = ['Promotion', 'TextAd'];
      if (!types.includes(type)) return null;

      return linkUrl;
    },
  },

  Authorable: {
    /**
     *
     */
    __resolveType(obj) {
      return `Content${obj.type}`;
    },
  },
};
