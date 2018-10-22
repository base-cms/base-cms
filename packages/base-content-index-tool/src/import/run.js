const chalk = require('chalk');
const base4 = require('../base4');
const elastic = require('../elastic');
const { whilstPromise } = require('../utils/async');
const { filter, analyzer } = require('../elastic/index-settings');

const { log } = console;

const esOptions = {
  index: 'keyword_analysis',
  type: 'content',
};

module.exports = async ({ batchSize }) => {
  const { index, type } = esOptions;
  log(chalk`{blue Setup Elasticsearch...}`);

  // Delete the index.
  await elastic.deleteIndex(index);
  log(chalk`{gray Index removed.}`);

  const exists = await elastic.indexExists(index);
  if (!exists) {
    // Create index.
    await elastic.createIndex(index, {
      settings: {
        analysis: {
          filter,
          analyzer: {
            default: analyzer,
            default_search: analyzer,
          },
        },
      },
    });
    log(chalk`{gray Index created.}`);
    // Create mappings.
    await elastic.putMapping(index, type, {
      properties: {
        name: { type: 'text' },
        body: { type: 'text' },
        teaser: { type: 'text' },
        taxonomy: { type: 'text' },
      },
    });
    log(chalk`{gray Index mappings created.}`);
  }
  log(chalk`{blue Elasticsearch setup} {green complete}`);

  log(chalk`{blue Begin bulk import...}`);

  const criteria = { type: { $in: ['Article', 'MediaGallery'] } };
  const projection = {
    name: 1,
    deck: 1,
    body: 1,
    taxonomy: 1,
  };

  const count = await base4.count('platform.Content', criteria);
  log(chalk`{gray Found} {white ${count}} {gray documents in MongoDB}`);

  let offset = 0;
  let hasMore = count > offset;
  await whilstPromise(() => hasMore === true, async () => {
    const bulkBody = [];
    log(chalk`{gray Starting from offset} {white ${offset}}`);
    const cursor = await base4.find('platform.Content', criteria, {
      projection,
      skip: offset,
      limit: batchSize,
      sort: { _id: 1 },
    });
    const length = await cursor.count(true);

    log(chalk`{gray Retrieved} {white ${length}} {gray documents from MongoDB.}`);

    let firstDoc;
    await new Promise((resolve, reject) => {
      cursor.forEach((doc) => {
        if (!firstDoc) {
          firstDoc = doc;
          log(chalk`{gray Beginning bulk body creation at ID} {white ${doc._id}}`);
        }
        bulkBody.push({ index: { _index: index, _type: type, _id: doc._id } });
        bulkBody.push({ name: doc.name || '', body: doc.body || '' });
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    await cursor.close();

    const bulkRes = await elastic.bulk({ body: bulkBody });
    log(chalk`{gray Bulk indexed} {white ${length}} {gray documents in Elasticsearch (${bulkRes.took}ms).}`);

    offset += length;
    hasMore = count > offset;

    log(chalk`{gray Has more?} ${hasMore ? chalk`{green Yes}` : chalk`{yellow No}`}`);
  });
  log(chalk`{blue Bulk import} {green complete}`);
};
