const { BaseDB } = require('@base-cms/db');
const { UserInputError } = require('apollo-server-express');
const { cleanPath } = require('@base-cms/utils');
const { content: canonicalPathFor } = require('@base-cms/canonical-path');
const { get } = require('@base-cms/object-path');
const { parser: embedParser } = require('@base-cms/embedded-media');
const { underscore, dasherize, titleize } = require('@base-cms/inflector');

const relatedContent = require('../../utils/related-content');
const inquiryContacts = require('../../utils/inquiry-contacts');
const connectionProjection = require('../../utils/connection-projection');
const getDefaultOption = require('../../utils/get-default-option');
const getDescendantIds = require('../../utils/website-section-child-ids');
const {
  createTitle,
  createDescription,
  getPublishedCriteria,
  getDefaultContentTypes,
} = require('../../utils/content');
const contentTeaser = require('../../utils/content-teaser');

const { isArray } = Array;

const resolveType = async ({ type }) => `Content${type}`;

module.exports = {
  Addressable: {
    __resolveType: resolveType,
    cityStateZip: ({ city, state, zip }) => {
      let out = '';
      if (city && state) {
        out = `${city}, ${state}`;
      } else if (city) {
        out = `${city}`;
      } else if (state) {
        out = `${state}`;
      }
      if (zip) out = `${out} ${zip}`;
      return out || null;
    },
  },
  Authorable: { __resolveType: resolveType },
  Contactable: { __resolveType: resolveType },
  SocialLinkable: { __resolveType: resolveType },
  OrganizationContactable: { __resolveType: resolveType },
  Inquirable: {
    __resolveType: resolveType,
    inquiryContacts,
  },

  /**
   *
   */
  Media: {
    __resolveType: resolveType,
    fileSrc: ({ fileName, filePath }, _, { assetHost }) => `https://${assetHost}/${cleanPath(filePath)}/${fileName}`,
  },

  /**
   *
   */
  ContentMetadata: {
    title: content => createTitle(content),
    description: content => createDescription(content),
  },

  /**
   *
   */
  Content: {
    __resolveType: resolveType,

    teaser: (content, { input }) => {
      const { mutation } = input;
      const teaser = contentTeaser.getTeaser(mutation, content);
      const { teaserFallback } = content;
      return contentTeaser.generateTeaser(teaser, teaserFallback, input) || null;
    },

    body: (content, { input }, { imageHost, basedb }) => {
      const { mutation, embeds } = input;
      const { body } = content;
      const mutated = get(content, `mutations.${mutation}.body`);

      const value = mutation ? mutated || body : body;
      // @todo Should likely have a better way of using the basedb in more than one place.
      // Ultimately, the db should become a service that multiple services can share.
      return embedParser.convertFromDbToHtml(value, {
        basedb,
        parse: embeds.parse,
        imageHost,
        lazyload: embeds.lazyloadImages,
      });
    },

    userRegistration: (content) => {
      const requiresRegistration = get(content, 'mutations.Website.requiresRegistration');
      const requiresAccessLevels = get(content, 'mutations.Website.requiresAccessLevels');

      const userRegistration = {
        isRequired: Boolean(requiresRegistration),
        accessLevels: [],
      };

      if (!requiresRegistration) return userRegistration;
      if (isArray(requiresAccessLevels)) userRegistration.accessLevels = requiresAccessLevels;
      return userRegistration;
    },

    metadata: content => content,

    canonicalPath: (content, _, ctx) => canonicalPathFor(content, ctx),

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

    relatedContent: (doc, { input }, { basedb }, info) => {
      const {
        queryTypes,
      } = input;
      // If no query types were specified (owned, inverse, etc), return an empty response.
      if (!queryTypes.length) return BaseDB.paginateEmpty();

      // Run perform the related content query.
      return relatedContent.performQuery(doc, { input, basedb, info });
    },
  },


  /**
   *
   */
  ContentVenue: {
    spaces: ({ _id: venue }, { input }, { basedb }, info) => {
      const { pagination } = input;
      const query = { ...getPublishedCriteria({ contentTypes: ['Space'] }), venue };
      const projection = connectionProjection(info);

      return basedb.paginate('platform.Content', {
        query,
        sort: { field: 'id', order: 'asc' },
        projection,
        ...pagination,
      });
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
        beginning,
        ending,
      } = input;

      const query = getPublishedCriteria({ since, contentTypes });

      if (beginning.before) query.$and.push({ startDate: { $lte: beginning.before } });
      if (beginning.after) query.$and.push({ startDate: { $gte: beginning.after } });
      if (ending.before) query.$and.push({ endDate: { $lte: ending.before } });
      if (ending.after) query.$and.push({ endDate: { $gte: ending.after } });

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
    allAuthorContent: async (_, { input }, { basedb }, info) => {
      const {
        since,
        contactId,
        authorTypes,
        includeContentTypes,
        requiresImage,
        sort,
        pagination,
      } = input;

      if (!authorTypes.length) throw new UserInputError('At least one `authorType` must be provided.');

      const query = getPublishedCriteria({ since, contentTypes: includeContentTypes });
      query.$or = authorTypes.map((type) => {
        const field = `${type}s`;
        return { [field]: contactId };
      });

      if (requiresImage) {
        query.primaryImage = { $exists: true };
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
    allCompanyContent: async (_, { input }, { basedb }, info) => {
      const {
        since,
        companyId,
        includeContentTypes,
        requiresImage,
        sort,
        pagination,
      } = input;

      const query = getPublishedCriteria({ since, contentTypes: includeContentTypes });
      query.$or = [
        { company: companyId },
        { 'relatedTo.$id': companyId },
      ];

      if (requiresImage) {
        query.primaryImage = { $exists: true };
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
     * @todo add content publishing fields to magaazine schedules
     */
    magazineScheduledContent: async (_, { input }, { basedb }, info) => {
      const {
        issueId,
        sectionId,
        excludeContentIds,
        includeContentTypes: contentTypes,
        requiresImage,
        pagination,
      } = input;

      const since = new Date();
      const idQuery = {
        issue: issueId,
      };
      if (sectionId) idQuery.section = sectionId;

      const ids = await basedb.distinct('magazine.Schedule', 'content.$id', idQuery);

      const query = getPublishedCriteria({ excludeContentIds, contentTypes, since });
      query.$and.push({ _id: { $in: ids } });

      if (requiresImage) query.primaryImage = { $exists: true };

      const projection = connectionProjection(info);
      return basedb.paginate('platform.Content', {
        query,
        projection,
        sort: { field: 'published', order: 'desc' },
        ...pagination,
      });
    },

    /**
     *
     */
    websiteScheduledContent: async (_, { input }, { basedb }, info) => {
      const {
        sectionId,
        sectionAlias,
        optionId,
        excludeContentIds,
        excludeSectionIds,
        includeContentTypes,
        excludeContentTypes,
        requiresImage,
        sectionBubbling,
        pagination,
      } = input;

      if (!sectionId && !sectionAlias) throw new UserInputError('Either a sectionId or sectionAlias input must be provided.');
      if (sectionId && sectionAlias) throw new UserInputError('You cannot provided both a sectionId and sectionAlias as input.');

      let sid = sectionId;
      if (sectionAlias) {
        const section = await basedb.strictFindOne('website.Section', { status: 1, alias: sectionAlias }, { projection: { _id: 1 } });
        sid = section._id;
      }

      const [descendantIds, defaultOption] = await Promise.all([
        sectionBubbling ? getDescendantIds(sid, basedb) : Promise.resolve([]),
        !optionId ? getDefaultOption(basedb) : Promise.resolve(null),
      ]);

      const now = new Date();
      const $elemMatch = {
        sectionId: descendantIds.length ? { $in: descendantIds } : sid,
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
        $elemMatch.$and.push({ sid: { $nin: excludeSectionIds } });
      }
      const query = { sectionQuery: { $elemMatch } };
      if (requiresImage) {
        query.primaryImage = { $exists: true };
      }
      if (includeContentTypes.length) {
        if (!isArray(query.$and)) query.$and = [];
        query.$and.push({ type: { $in: includeContentTypes } });
      } else {
        if (!isArray(query.$and)) query.$and = [];
        query.$and.push({ type: { $in: getDefaultContentTypes() } });
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
        sort: { field: 'sectionQuery.0.start', order: 'desc' },
        projection: { 'sectionQuery.$.start': 1, ...projection },
        excludeProjection: ['sectionQuery.start'],
        ...pagination,
      });
    },

    /**
     *
     */
    relatedPublishedContent: async (_, { input }, { basedb }, info) => {
      const {
        contentId,
        queryTypes,
      } = input;
      // If no query types were specified (owned, inverse, etc), return an empty response.
      if (!queryTypes.length) return BaseDB.paginateEmpty();

      // Retrieve the content document.
      const doc = await basedb.findById('platform.Content', contentId, {
        projection: { _id: 1, relatedTo: 1, 'mutations.Website.primarySection': 1 },
      });

      // If no content document was found, return an empty response.
      if (!doc) return BaseDB.paginateEmpty();

      // Run perform the related content query.
      return relatedContent.performQuery(doc, { input, basedb, info });
    },
  },
};
