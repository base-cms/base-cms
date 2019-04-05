const moment = require('moment');
const { BaseDB, MongoDB } = require('@base-cms/db');
const { TENANT_KEY, MONGO_DSN } = require('../env');

const { Client } = MongoDB;

const basedb = new BaseDB({
  tenant: TENANT_KEY,
  client: new Client(MONGO_DSN, { useNewUrlParser: true }),
  // logger: console.log,
});

const statusCriteria = {
  status: 1,
  published: { $lte: new Date() },
  $or: [
    { unpublished: { $exists: false } },
    { unpublished: { $gte: new Date() } },
  ],
};

module.exports = {
  getContent: (type, skip) => {
    const query = {
      ...statusCriteria,
      type,
    };
    const options = {
      limit: 10000,
      projection: { updated: 1 },
      skip,
    };
    // @todo need canonicalPath stuff from gql-server so these don't 301.
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
      { $match: statusCriteria },
      { $group: { _id: '$type', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ];
    return basedb.aggregate('platform.Content', pipeline);
  },
  getLatestNews: () => {
    const published = new Date(moment().subtract(5, 'days').valueOf());
    const query = {
      ...statusCriteria,
      type: { $in: ['News', 'PressRelease', 'Blog'] },
      $and: [
        { published: { $gte: published } },
      ],
    };
    const options = {
      limit: 1000,
      projection: { published: 1, type: 1, name: 1 },
      sort: { published: -1 },
    };
    return basedb.find('platform.Content', query, options);
  },
};
