const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const base4 = require('../base4');
const Base4 = require('../base4/client');
const elastic = require('../elastic');
const { taxonomyLoader } = require('../base4/loaders');
const { whilstPromise, eachSeriesPromise } = require('../utils/async');
const { filter, analyzer } = require('../elastic/index-settings');

const { log } = console;

const esOptions = {
  index: 'keyword_analysis',
  type: 'content',
};

const setupElastic = async (populate) => {
  const { index, type } = esOptions;
  log(chalk`{blue Setup Elasticsearch...}`);

  // Delete the index.
  if (populate) {
    await elastic.deleteIndex(index);
    log(chalk`{gray Index removed.}`);
  }

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
        name: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } }
        },
        type: { type: 'keyword' },
        body: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } }
        },
        teaser: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } }
        },
        taxonomy: {
          type: 'text',
          fields: { boolsim: { type: 'text', similarity: 'boolean' } }
        },
      },
    });
    log(chalk`{gray Index mappings created.}`);
  }
  log(chalk`{blue Elasticsearch setup} {green complete}`);
};

const popluateIndex = async (batchSize) => {
  const { index, type } = esOptions;
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
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      if (!firstDoc) {
        firstDoc = doc;
        log(chalk`{gray Beginning bulk body creation at ID} {white ${doc._id}}`);
      }
      const taxonomyIds = Base4.extractRefIds(doc.taxonomy);
      let taxonomy;
      if (taxonomyIds.length) {
        const taxDocs = await taxonomyLoader.loadMany(taxonomyIds);
        taxonomy = taxDocs.map(t => t.name.replace('-', '').replace(/\W/g, ' ')).join(', ');
      }

      bulkBody.push({ index: { _index: index, _type: type, _id: doc._id } });
      bulkBody.push({
        name: doc.name || undefined,
        body: doc.body || undefined,
        teaser: doc.teaser || doc.deck || undefined,
        type: doc.type || undefined,
        taxonomy,
      });
    }

    await cursor.close();

    const bulkRes = await elastic.bulk({ body: bulkBody });
    log(chalk`{gray Bulk indexed} {white ${length}} {gray documents in Elasticsearch (${bulkRes.took}ms).}`);

    offset += length;
    hasMore = count > offset;

    log(chalk`{gray Has more?} ${hasMore ? chalk`{green Yes}` : chalk`{yellow No}`}`);
  });
  log(chalk`{blue Bulk import} {green complete}`);
};

const buildQuery = (phrases) => {
  const should = phrases.map((phrase) => ({
    multi_match: {
      query: phrase,
      fields: ['taxonomy^1.5', 'name^1.5', 'teaser^1.2', 'body'],
      type: 'phrase',
      tie_breaker: 0.5,
      _name: phrase,
    },
  }));
  return { bool: { should } };
};

module.exports = async ({ batchSize, populate }) => {
  const { index, type } = esOptions;
  await setupElastic(populate);
  if (populate) {
    await popluateIndex(batchSize);
  }
  const keywords = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, '../../keywords.yml')));


  await eachSeriesPromise(Object.keys(keywords), async (channel) => {
    const phrases = keywords[channel];
    const query = buildQuery(phrases);

    const buildBody = (search_after) => ({
      query,
      size: batchSize,
      _source: false,
      sort: [
        { _score: 'desc' },
        { _id: 'asc' },
      ],
      search_after,
    });

    log(chalk`{gray Begin index analysis for the} {blue ${channel}} {gray keyword group...}`);

    const { count } = await elastic.count(index, type, { query });
    log(chalk`{gray Found} {white ${count}} {gray total hits for} {blue ${channel}}`);

    let maxScore = 0;
    let offset = 0;
    let hasMore = count > offset;
    let after;
    let i = 0;
    const totalPages = Math.floor(count / batchSize);

    const collection = await base4.collectionFor('platform.Content');

    await whilstPromise(() => hasMore === true, async () => {
      const body = buildBody(after);
      const { hits: results } = await elastic.search(index, type, body, { searchType: 'dfs_query_then_fetch' });

      if (!maxScore) maxScore = results.hits[0]._score;

      const bulkOpts = [];
      const length = await results.hits.length;
      results.hits.forEach((hit) => {
        const {
          _id,
          _score: score,
          sort,
          matched_queries: matched,
        } = hit;
        const strength = maxScore > 0 ? score / maxScore : 0;
        const $addToSet = { elastic: { channel, score, strength, matched } };
        after = sort;

        bulkOpts.push({ updateOne: { filter: { _id: Number(_id) }, update: { $addToSet } } });
      });
      await collection.bulkWrite(bulkOpts);
      log(chalk`{gray Mapped} {white ${length}} {gray document scores [${i} of ${totalPages}]}`);

      i += 1;
      offset += length;
      hasMore = count > offset;

      log(chalk`{gray Has more?} ${hasMore ? chalk`{green Yes}` : chalk`{yellow No}`}`);
    });
    log(chalk`{gray Index analysis for} {blue ${channel}} {gray complete.}`);
  });
};
