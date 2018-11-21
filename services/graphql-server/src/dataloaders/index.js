const DataLoader = require('dataloader');
const { MongoDB } = require('@base-cms/db');
const hash = require('object-hash');
const basedb = require('../basedb');

const { ObjectID } = MongoDB;

const cacheKeyFn = queries => hash(queries, {
  encoding: 'base64',
  replacer: (value) => {
    if (value instanceof ObjectID) return `${value}`;
    return value;
  },
});

module.exports = () => ({
  /**
   * @todo Ensure results are returned in array order.
   */
  product: new DataLoader((queries) => {
    const query = { $or: queries };
    return basedb.findAsArray('platform.Product', query);
  }, { cacheKeyFn }),

  websiteOption: new DataLoader((queries) => {
    const query = { $or: queries };
    return basedb.findAsArray('website.Option', query);
  }, { cacheKeyFn }),
});
