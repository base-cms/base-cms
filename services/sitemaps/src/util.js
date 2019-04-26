const moment = require('moment');
const { getPublishedContentCriteria } = require('@base-cms/utils');
const { PAGE_SIZE } = require('./env');

/**
 * Returns an array of file suffixes based on counts e.g;
 * count=    1 = ['']
 * count=10000 = ['']
 * count=10001 = ['', '.1']
 * count=20000 = ['', '.1']
 * count=20001 = ['', '.1', '.2']
 *
 * @param {*} count
 * @param {*} limit
 */
const getSuffixes = (count, limit = PAGE_SIZE) => {
  const num = count % limit === 0
    ? count / limit
    : ((count - (count % limit)) / limit) + 1;
  return [...Array(num).keys()].map(x => (x === 0 ? '' : `.${x}`));
};

module.exports = {
  getSuffixes,
  getContent: (basedb, type, skip) => {
    const query = {
      ...getPublishedContentCriteria(),
      type,
    };
    const options = {
      limit: PAGE_SIZE,
      projection: {
        'mutations.Website.alias': 1,
        'mutations.Website.primarySection': 1,
        'mutations.Website.slug': 1,
        type: 1,
        updated: 1,
      },
      sort: {
        updated: 1,
      },
      skip,
    };
    return basedb.find('platform.Content', query, options);
  },
  getSections: (basedb) => {
    const options = {
      projection: { alias: 1 },
      sort: { sequence: 1 },
    };
    return basedb.find('website.Section', { status: 1 }, options);
  },
  getContentCounts: (basedb) => {
    const pipeline = [
      { $match: getPublishedContentCriteria() },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ];
    return basedb.aggregate('platform.Content', pipeline);
  },
  getPrimarySectionLoader: async (basedb, ids) => {
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
  getLatestNews: (basedb) => {
    const published = moment().subtract(5, 'days').toDate();
    const query = {
      ...getPublishedContentCriteria(),
      type: { $in: ['News', 'PressRelease', 'Blog'] },
      $and: [
        { published: { $gte: published } },
      ],
    };
    const options = {
      limit: 1000,
      projection: {
        'mutations.Website.primarySection': 1,
        'mutations.Website.slug': 1,
        type: 1,
        published: 1,
        name: 1,
      },
      sort: { published: -1 },
    };
    return basedb.find('platform.Content', query, options);
  },
};
