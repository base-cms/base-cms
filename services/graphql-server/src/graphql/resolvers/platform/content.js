const { UserInputError } = require('apollo-server-express');
const { underscore, dasherize, titleize } = require('inflection');
const pathResolvers = require('../../utils/content-path-resolvers');
const { createTitle, createDescription } = require('../../utils/content');

const resolveType = ({ type }) => `Content${type}`;

module.exports = {
  Addressable: { __resolveType: resolveType },
  Authorable: { __resolveType: resolveType },
  Contactable: { __resolveType: resolveType },
  Media: { __resolveType: resolveType },

  /**
   *
   */
  Content: {
    __resolveType: resolveType,

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

    type: ({ type }, { input }) => {
      const { format } = input;
      switch (format) {
        case 'dasherize':
          return dasherize(underscore(type));
        case 'underscore':
          return underscore(type);
        case 'titleize':
          return titleize(underscore(type));
        default:
          return type;
      }
    },
  },
};
