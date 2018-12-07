/* eslint-disable no-param-reassign */
const DataLoader = require('dataloader');
const { MongoDB } = require('@base-cms/db');
const hash = require('object-hash');

const { ObjectID } = MongoDB;

const cacheKeyFn = queries => hash(queries, {
  encoding: 'base64',
  replacer: (value) => {
    if (value instanceof ObjectID) return `${value}`;
    return value;
  },
});

module.exports = basedb => ({
  /**
   * @todo Ensure results are returned in array order.
   */
  product: new DataLoader((queries) => {
    const query = { $or: queries };
    return basedb.find('platform.Product', query);
  }, { cacheKeyFn }),

  websiteOption: new DataLoader((queries) => {
    const query = { $or: queries };
    return basedb.find('website.Option', query);
  }, { cacheKeyFn }),

  activeWebsiteSections: new DataLoader(async (keys) => {
    const map = keys.reduce((o, [id, fields]) => {
      if (o[id] === undefined) o[id] = { _id: id, set: new Set() };
      if (!fields) {
        o[id].set = null;
      } else if (o[id].set) {
        o[id].set = new Set([...fields, ...o[id].set]);
      }
      return o;
    }, {});

    const queryMap = Object.keys(map).reduce((o, id) => {
      const { _id, set } = map[id];
      const fields = set ? [...set] : [];
      const key = fields.join('|');
      const projection = fields.reduce((p, name) => ({ ...p, [name]: 1 }), {});
      if (!o[key]) o[key] = { ids: [], projection };
      o[key].ids.push(_id);
      return o;
    }, {});

    const resultSets = await Promise.all(Object.keys(queryMap).map((key) => {
      const v = queryMap[key];
      const { ids, projection } = v;
      return basedb.find('website.Section', { _id: { $in: ids }, status: 1 }, { projection });
    }));

    const resultHash = resultSets
      .reduce((o, docs) => docs.reduce((h, doc) => ({ ...h, [doc._id]: doc }), o), {});

    return keys.map(([id]) => (resultHash[id] || null));
  }, {
    cacheKeyFn: ([id, fields]) => `${id}:${fields ? fields.join('|') : '*'}`,
  }),
});
