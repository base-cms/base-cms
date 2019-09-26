const { BaseDB } = require('@base-cms/db');
const { websiteSection: canonicalPathFor } = require('@base-cms/canonical-path');
const getProjection = require('../../utils/get-projection');
const getGraphType = require('../../utils/get-graph-type');
const { createTitle, createDescription } = require('../../utils/website-section');
const getDescendantIds = require('../../utils/website-section-child-ids');
const sitemap = require('../../utils/sitemap');

const loadHierarchy = async (section, load, projection, sections = []) => {
  const ref = BaseDB.get(section, 'parent');
  const parentId = BaseDB.extractRefId(ref);
  if (!parentId) return sections;
  const parent = await load('websiteSection', parentId, projection, { status: 1 });
  if (!parent) return sections;
  sections.push(parent);
  return loadHierarchy(parent, load, projection, sections);
};

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  WebsiteSection: {
    canonicalPath: (section, _, ctx) => canonicalPathFor(section, ctx),

    /**
     * Placeholder.
     * Used for consistency with content.
     */
    redirectTo: () => null,

    metadata: (section, _, { site }) => ({
      title: () => createTitle(section),
      description: () => createDescription(section, site),
    }),

    hierarchy: async (section, _, { load }, info) => {
      const {
        returnType,
        fieldNodes,
        schema,
        fragments,
      } = info;
      const projection = getProjection(
        schema,
        getGraphType(returnType),
        fieldNodes[0].selectionSet,
        fragments,
      );
      projection.parent = 1;
      const thisSection = await load('websiteSection', section._id, projection, { status: 1 });
      const sections = await loadHierarchy(section, load, projection, [thisSection]);
      return sections.reverse();
    },
  },

  /**
   *
   */
  WebsiteSectionSitemapUrl: {
    loc: async (section, _, ctx) => {
      const path = await canonicalPathFor(section, ctx);
      return encodeURI(sitemap.escape(`${ctx.site.origin}${path}`));
    },
    lastmod: async (section, _, { basedb }) => {
      const now = new Date();
      const descendantIds = await getDescendantIds(section._id, basedb);
      const sectionIds = isArray(descendantIds) && descendantIds.length
        ? descendantIds
        : [section._id];

      const query = {
        status: 1,
        contentStatus: 1,
        section: { $in: sectionIds },
        startDate: { $lte: now },
        $and: [
          {
            $or: [
              { endDate: { $gt: now } },
              { endDate: { $exists: false } },
            ],
          },
        ],
      };
      const schedule = await basedb.findOne('website.Schedule', query, {
        projection: { startDate: 1 },
        sort: { startDate: -1 },
        limit: 1,
      });
      if (schedule) return schedule.startDate;
      return null;
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    websiteSectionSitemapUrls: async (_, { input }, { basedb, site }) => {
      const {
        changefreq,
        priority,
        pagination,
      } = input;

      const { limit, skip } = pagination;

      const query = { status: 1 };
      query['site.$id'] = site._id;

      const projection = { alias: 1 };
      const sort = { alias: 1 };
      const cursor = await basedb.find('website.Section', query, {
        limit,
        skip,
        projection,
        sort,
      });

      const docs = [];
      await cursor.forEach((doc) => {
        docs.push({ ...doc, changefreq, priority });
      });
      return docs;
    },
  },
};
