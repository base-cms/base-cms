const moment = require('moment');
const basedb = require('./basedb');

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
const getSuffixes = (count, limit = 10000) => {
  const num = count % limit === 0
    ? count / limit
    : ((count - (count % limit)) / limit) + 1;
  return [...Array(num).keys()].map(x => (x === 0 ? '' : `.${x}`));
};

const statusCriteria = () => {
  const date = new Date();
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
  getSuffixes,
  getContent: (type, skip) => {
    const query = {
      ...statusCriteria(),
      type,
    };
    const options = {
      limit: 10000,
      projection: {
        'mutations.Website.alias': 1,
        'mutations.Website.primarySection': 1,
        'mutations.Website.slug': 1,
        type: 1,
        updated: 1,
      },
      skip,
    };
    return basedb.find('platform.Content', query, options);
  },
  getSections: () => {
    const options = {
      projection: { alias: 1 },
      sort: { sequence: 1 },
    };
    return basedb.find('website.Section', { status: 1 }, options);
  },
  getContentCounts: () => {
    const pipeline = [
      { $match: statusCriteria() },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ];
    return basedb.aggregate('platform.Content', pipeline);
  },
  getPrimarySections: (ids) => {
    const query = {
      _id: { $in: ids },
      status: 1,
    };
    const options = {
      projection: { alias: 1 },
    };
    return basedb.find('website.Section', query, options);
  },
  getLatestNews: () => {
    const published = moment().subtract(5, 'days').toDate();
    const query = {
      ...statusCriteria(),
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
