const chalk = require('chalk');
const env = require('../env');
const base4 = require('../base4');
const elastic = require('../elastic');
const { whilstPromise, eachSeriesPromise } = require('../utils/async');
const buildQuery = require('./build-elastic-query');

const { ELASTIC_INDEX, ELASTIC_TYPE } = env;
const { log } = console;

const buildBody = (query, size, after) => ({
  query,
  size,
  _source: {
    includes: ['name', 'teaser', 'body'],
  },
  sort: [
    { _score: 'desc' },
    { _id: 'asc' },
  ],
  search_after: after,
});

const mongoIndexes = [
  { key: { contentId: 1 }, name: 'contentId' },
  { key: { channel: 1 }, name: 'channel' },
  { key: { score: 1 }, name: 'score' },
];

/**
 *
 * @param {object} keywordMap
 */
module.exports = async (keywordMap, batchSize) => {
  const collection = await base4.collectionFor('platform.KeywordAnalysis');
  await collection.deleteMany();
  await collection.createIndexes(mongoIndexes);
  log(chalk`{gray Cleared destination Mongo collection.}`);


  await eachSeriesPromise(Object.keys(keywordMap), async (channel) => {
    const phrases = keywordMap[channel];
    const query = buildQuery(phrases);
    log(chalk`{gray Begin index analysis for the} {blue ${channel}} {gray keyword group...}`);

    const { count } = await elastic.count(ELASTIC_INDEX, ELASTIC_TYPE, { query });
    log(chalk`{gray Found} {white ${count}} {gray total hits for} {blue ${channel}}`);

    let maxScore = 0;
    let offset = 0;
    let hasMore = count > offset;
    let after;
    let i = 1;
    const totalPages = Math.ceil(count / batchSize);

    await whilstPromise(() => hasMore === true, async () => {
      const body = buildBody(query, batchSize, after);
      const { hits: results } = await elastic.search(ELASTIC_INDEX, ELASTIC_TYPE, body, { searchType: 'dfs_query_then_fetch' });

      const { _score: firstScore } = results.hits[0];
      if (!maxScore) maxScore = firstScore;

      const length = await results.hits.length;
      const bulkOps = [];
      results.hits.forEach((hit) => {
        const {
          _id,
          _score: score,
          _source: source,
          sort,
          matched_queries: matched,
        } = hit;
        const contentId = Number(_id);
        const strength = maxScore > 0 ? score / maxScore : 0;

        bulkOps.push({
          updateOne: {
            filter: { _id: contentId },
            update: {
              $setOnInsert: { _id: contentId, source },
              $push: {
                matches: {
                  channel,
                  score,
                  strength,
                  matched,
                },
              },
            },
            upsert: true,
          },
        });
        after = sort;
      });
      await collection.bulkWrite(bulkOps);
      log(chalk`{gray Mapped} {white ${length}} {gray document scores [${i} of ${totalPages}]}`);

      i += 1;
      offset += length;
      hasMore = count > offset;

      log(chalk`{gray Has more?} ${hasMore ? chalk`{green Yes}` : chalk`{yellow No}`}`);
    });
    log(chalk`{gray Index analysis for} {blue ${channel}} {gray complete.}`);
  });
};
