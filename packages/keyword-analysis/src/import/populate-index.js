/* eslint-disable no-await-in-loop */
const chalk = require('chalk');
const ProgressBar = require('progress');
const elastic = require('../elastic');
const base4 = require('../base4');
const Base4 = require('../base4/client');
const env = require('../env');
const { taxonomyLoader } = require('../base4/loaders');
const { whilstPromise } = require('../utils/async');
const stripHtml = require('../utils/strip-html');

const { ELASTIC_INDEX, ELASTIC_TYPE } = env;
const { log } = console;

/**
 *
 * @param {number} batchSize
 */
module.exports = async (batchSize) => {
  log(chalk`{blue Begin bulk import...}`);

  const criteria = { type: { $in: ['Article', 'MediaGallery'] } };
  const projection = {
    name: 1,
    deck: 1,
    teaser: 1,
    body: 1,
    taxonomy: 1,
    type: 1,
  };

  const count = await base4.count('platform.Content', criteria);
  log(chalk`{gray Found} {white ${count}} {gray documents in MongoDB}`);

  log(chalk`{gray Prime the Taxonomy loader...}`);
  const taxDocs = await base4.find('platform.Taxonomy', {}, {}, true);
  taxDocs.map(taxDoc => taxonomyLoader.prime(taxDoc._id, taxDoc));
  log(chalk`{gray Priming complete.}`);

  let offset = 0;
  let hasMore = count > offset;

  const totalPages = Math.ceil(count / batchSize);
  const bar = new ProgressBar('[:current/:total] Complete :percent (ETA: :etas)', {
    total: totalPages,
  });

  await whilstPromise(() => hasMore === true, async () => {
    const bulkBody = [];
    const cursor = await base4.find('platform.Content', criteria, {
      projection,
      skip: offset,
      limit: batchSize,
      sort: { _id: 1 },
    });
    const length = await cursor.count(true);

    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      const taxonomyIds = Base4.extractRefIds(doc.taxonomy);
      let taxonomy;
      let terms = [];
      if (taxonomyIds.length) {
        const taxonomies = await taxonomyLoader.loadMany(taxonomyIds);
        taxonomy = [...new Set(taxonomies.map(t => t.name.replace('-', '').replace(/\W/g, ' ')))].join(', ');
        terms = [...new Set(taxonomies.map(t => stripHtml(t.name)))];
      }

      bulkBody.push({ index: { _index: ELASTIC_INDEX, _type: ELASTIC_TYPE, _id: doc._id } });
      bulkBody.push({
        name: stripHtml(doc.name),
        body: stripHtml(doc.body),
        teaser: stripHtml(doc.teaser) || stripHtml(doc.deck),
        type: doc.type,
        taxonomy: stripHtml(taxonomy),
        terms,
      });
    }

    await Promise.all([
      cursor.close(),
      elastic.bulk({ body: bulkBody }),
    ]);

    offset += length;
    hasMore = count > offset;
    bar.tick();
  });
  log(chalk`{blue Bulk import} {green complete}`);
};
