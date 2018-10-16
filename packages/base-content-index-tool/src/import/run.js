const base4 = require('../base4');
const Base4 = require('../base4/client');
const { taxonomyLoader } = require('../base4/loaders');
const { eachPromise } = require('../utils/async');

const { log } = console;

module.exports = async ({ batchSize }) => {
  log(`Run ${batchSize}`);
  const docs = await base4.find('platform.Content', { taxonomy: { $exists: true } }, {
    projection: {
      name: 1,
      teaser: 1,
      body: 1,
      taxonomy: 1,
    },
    limit: 5,
  });
  log(docs.map(d => d._id));

  await eachPromise(docs, async ({ taxonomy }) => {
    const ids = Base4.extractRefIds(taxonomy);
    if (ids.length) {
      const taxonomyDocs = await taxonomyLoader.loadMany(ids);
      log(taxonomyDocs.length);
    }
  });
};
