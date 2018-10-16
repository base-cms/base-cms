const base4 = require('../base4');

const { log } = console;

module.exports = async ({ batchSize }) => {
  log(`Run ${batchSize}`);
  const coll = await base4.collectionFor('platform.Content');
  const cursor = await coll.find({}, {
    projection: {
      name: 1,
      teaser: 1,
      body: 1,
      taxonomy: 1,
    },
  }).limit(5);
  const docs = await cursor.toArray();
  log(docs.length);
};
