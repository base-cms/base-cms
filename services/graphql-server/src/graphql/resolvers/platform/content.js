const { UserInputError } = require('apollo-server-express');
const { underscore, dasherize, titleize } = require('inflection');
const pathResolvers = require('../../utils/content-path-resolvers');
const { createTitle, createDescription } = require('../../utils/content');
const defaultContentTypes = require('../../utils/content-types');
const getDescendantIds = require('../../utils/website-section-child-ids');

const { isArray } = Array;

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

    /**
     * Return title and description as functions, so they're only
     * executed when requested.
     */
    metadata: (content, _, { load }) => ({
      title: () => createTitle(content, load),
      description: () => createDescription(content),
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

  /**
   *
   */
  Query: {
    /**
     *
     */
    allPublishedContent: async (_, { input }, { basedb }) => {
      const {
        since,
        sectionId,
        contentTypes,
        requiresImage,
        sectionBubbling,
        sort,
        pagination,
      } = input;

      const date = since || new Date();
      const query = {
        status: 1,
        type: { $in: contentTypes.length ? contentTypes : defaultContentTypes },
        published: { $lte: date },
        $or: [
          { unpublished: { $gte: date } },
          { unpublished: { $exists: false } },
        ],
      };

      if (requiresImage) {
        query.primaryImage = { $exists: true };
      }

      let sectionIds = sectionId;
      if (sectionId && sectionBubbling) {
        const descendantIds = await getDescendantIds(sectionId, basedb);
        if (descendantIds.length) {
          sectionIds = { $in: descendantIds };
        }
      }
      if (sectionIds) {
        query['mutations.Website.primarySection.$id'] = sectionIds;
      }

      return basedb.paginate('platform.Content', {
        query,
        sort,
        ...pagination,
      });
    },

    /**
     *
     */
    websiteScheduledContent: async (_, { input }, { basedb }) => {
      const {
        sectionId,
        optionId,
        excludeContentIds,
        excludeSectionIds,
        includeContentTypes,
        excludeContentTypes,
        requiresImage,
        sectionBubbling,
        pagination,
      } = input;

      const now = new Date();
      let sectionIds = sectionId;
      if (sectionBubbling) {
        const descendantIds = await getDescendantIds(sectionId, basedb);
        if (descendantIds.length) {
          sectionIds = { $in: descendantIds };
        }
      }

      const $elemMatch = {
        sectionId: sectionIds,
        start: { $lte: now },
        $and: [
          {
            $or: [
              { end: { $gt: now } },
              { end: { $exists: false } },
            ],
          },
        ],
      };

      if (!optionId) {
        const defaultOption = await basedb.strictFindOne('website.Option', {
          name: 'Standard',
          status: 1,
        }, {
          projection: { _id: 1 },
        });
        $elemMatch.optionId = defaultOption._id;
      } else {
        $elemMatch.optionId = optionId;
      }

      if (excludeSectionIds.length) {
        $elemMatch.$and.push({ sectionId: { $nin: excludeSectionIds } });
      }

      const query = { schedules: { $elemMatch } };
      if (requiresImage) {
        query.hasImage = true;
      }
      if (includeContentTypes.length) {
        if (!isArray(query.$and)) query.$and = [];
        query.$and.push({ contentType: { $in: includeContentTypes } });
      }
      if (excludeContentTypes.length) {
        if (!isArray(query.$and)) query.$and = [];
        query.$and.push({ contentType: { $nin: excludeContentTypes } });
      }
      if (excludeContentIds.length) {
        query.contentId = { $nin: excludeContentIds };
      }

      const paginated = await basedb.paginate('website.SectionQuery', {
        query,
        collate: false,
        sort: { field: 'schedules.0.start', order: 'desc' },
        projection: { contentId: 1, 'schedules.$.start': 1 },
        ...pagination,
      });

      const { edges } = paginated;
      const contentIds = edges.map(({ node }) => node.contentId);
      const content = await basedb.findAsArray('platform.Content', { _id: { $in: contentIds } });

      return {
        ...paginated,
        edges: edges.map(({ node, cursor }) => {
          const item = content.find(c => c._id === node.contentId);
          return { cursor, node: item };
        }),
      };
    },
  },
};
