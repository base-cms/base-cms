const { get } = require('@base-cms/object-path');
const { isFunction: isFn, cleanPath } = require('@base-cms/utils');
const { underscore, dasherize, titleize } = require('@base-cms/inflector');

const connectionProjection = require('../../utils/connection-projection');
const defaultContentTypes = require('../../utils/content-types');
const getDefaultOption = require('../../utils/get-default-option');
const getDescendantIds = require('../../utils/website-section-child-ids');
const pathResolvers = require('../../utils/content-path-resolvers');
const { createTitle, createDescription } = require('../../utils/content');

const { isArray } = Array;

const dynamicPageResolvers = {
  alias: content => get(content, 'mutations.Website.alias'),
};

const handleDynamicPage = async (content, ctx) => {
  const { canonicalRules } = ctx;
  const { dynamicPage: pageRules } = canonicalRules;
  const { parts, prefix } = pageRules;

  const values = await Promise.all(parts.map((key) => {
    const fn = dynamicPageResolvers[key];
    return isFn(fn) ? fn(content, ctx) : content[key];
  }));

  const path = cleanPath(values.filter(v => v).map(v => String(v).trim()).join('/'));

  if (!path) return '';
  if (prefix) return `/${cleanPath(prefix)}/page/${path}`;
  return `/page/${path}`;
};

const resolveType = async ({ type }) => `Content${type}`;

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
      const { canonicalRules } = ctx;
      const { content: contentRules } = canonicalRules;
      const { parts, prefix } = contentRules;

      const { type, linkUrl } = content;

      if (type === 'Page') return handleDynamicPage(content, ctx);

      const types = ['Promotion', 'TextAd'];
      if (types.includes(type) && linkUrl) return linkUrl;

      const values = await Promise.all(parts.map((key) => {
        const fn = pathResolvers[key];
        return isFn(fn) ? fn(content, ctx) : content[key];
      }));

      const path = cleanPath(values.filter(v => v).map(v => String(v).trim()).join('/'));

      if (!path) return '';
      if (prefix) return `/${cleanPath(prefix)}/${path}`;
      return `/${path}`;
    },

    /**
     * Return title and description as functions, so they're only
     * executed when requested.
     */
    metadata: content => ({
      title: () => createTitle(content),
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
          return dasherize(type);
        case 'underscore':
          return underscore(type);
        case 'titleize':
          return titleize(type);
        default:
          return type;
      }
    },

    statusText: ({ status, published, unpublished }) => {
      const now = Date.now();
      switch (status) {
        case 0:
          return 'Deleted';
        case 1:
          if (published && published.valueOf() > now) return 'Scheduled';
          if (unpublished && unpublished < now) return 'Expired';
          if (published) return 'Published';
          return 'Unpublished';
        case 2:
          return 'Draft';
        default:
          return 'Unpublished';
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
    allPublishedContent: async (_, { input }, { basedb }, info) => {
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

      const projection = connectionProjection(info);
      return basedb.paginate('platform.Content', {
        query,
        sort,
        projection,
        ...pagination,
      });
    },

    /**
     *
     */
    websiteScheduledContent: async (_, { input }, { basedb }, info) => {
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

      const [descendantIds, defaultOption] = await Promise.all([
        sectionBubbling ? getDescendantIds(sectionId, basedb) : Promise.resolve([]),
        !optionId ? getDefaultOption(basedb) : Promise.resolve(null),
      ]);

      const now = new Date();
      const $elemMatch = {
        sectionId: descendantIds.length ? { $in: descendantIds } : sectionId,
        optionId: defaultOption ? defaultOption._id : optionId,
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

      if (excludeSectionIds.length) {
        $elemMatch.$and.push({ sectionId: { $nin: excludeSectionIds } });
      }
      const query = { sectionQuery: { $elemMatch } };
      if (requiresImage) {
        query.primaryImage = { $exists: true };
      }
      if (includeContentTypes.length) {
        if (!isArray(query.$and)) query.$and = [];
        query.$and.push({ type: { $in: includeContentTypes } });
      }
      if (excludeContentTypes.length) {
        if (!isArray(query.$and)) query.$and = [];
        query.$and.push({ type: { $nin: excludeContentTypes } });
      }
      if (excludeContentIds.length) {
        query._id = { $nin: excludeContentIds };
      }

      const projection = connectionProjection(info);
      return basedb.paginate('platform.Content', {
        query,
        sort: { field: 'sectionQuery.start', order: 'desc' },
        projection: { 'sectionQuery.$.start': 1, ...projection },
        excludeProjection: ['sectionQuery.start'],
        ...pagination,
      });
    },
  },
};
