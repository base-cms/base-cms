const { BaseDB } = require('@base-cms/db');
const basedb = require('./basedb');
const { PAGE_SIZE: limit } = require('./env');

const statusCriteria = (now) => {
  const date = now || new Date();
  return {
    status: 1,
    published: { $lte: date },
    $or: [
      { unpublished: { $exists: false } },
      { unpublished: { $gte: date } },
    ],
  };
};

module.exports = {
  getSectionByAlias: (alias) => {
    const options = {
      projection: { description: 1, name: 1, alias: 1 },
      sort: { sequence: 1 },
    };
    return basedb.findOne('website.Section', { alias, status: 1 }, options);
  },
  getPrimarySectionLoader: async (ids) => {
    const query = {
      _id: { $in: ids },
      status: 1,
    };
    const options = {
      projection: { alias: 1 },
    };
    const sections = await basedb.find('website.Section', query, options);
    const sectionMap = sections.reduce((map, section) => map.set(`${section._id}`, section), new Map());
    return (_, id) => sectionMap.get(`${id}`);
  },
  getSectionContent: async (sectionId) => {
    const now = new Date();
    const scheduleQuery = {
      ...statusCriteria(now),
      section: sectionId,
      contentStatus: 1,
      startDate: { $lte: now },
      $or: [
        { endDate: { $exists: false } },
        { endDate: { $gte: now } },
      ],
    };
    const scheduleOpts = {
      limit,
      projection: {
        content: 1,
      },
    };
    const schedules = await basedb.find('website.Schedule', scheduleQuery, scheduleOpts);
    const contentIds = schedules.map(s => BaseDB.extractRefId(BaseDB.get(s, 'content')));

    const query = {
      _id: { $in: contentIds },
    };
    const options = {
      limit,
      projection: {
        'mutations.Website.primarySection': 1,
        'mutations.Website.slug': 1,
        'mutations.Website.name': 1,
        type: 1,
        published: 1,
        name: 1,
        teaser: 1,
      },
    };
    const content = await basedb.find('platform.Content', query, options);
    return contentIds.map(id => content.find(({ _id }) => `${_id}` === `${id}`));
  },
};
