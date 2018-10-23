const chalk = require('chalk');
const ProgressBar = require('progress');
const env = require('../env');
const base4 = require('../base4');
const elastic = require('../elastic');
const { whilstPromise, eachSeriesPromise, eachPromise } = require('../utils/async');
const buildQuery = require('./build-elastic-query');

const { ELASTIC_INDEX, ELASTIC_TYPE } = env;
const { log } = console;

const buildBody = (query, size, after) => ({
  query,
  size,
  _source: {
    includes: ['name', 'teaser', 'body', 'terms'],
  },
  sort: [
    { _score: 'desc' },
    { _id: 'asc' },
  ],
  search_after: after,
});

const mongoIndexes = [
  { key: { 'matches.channel': 1 }, name: 'channel' },
  { key: { 'matches.score': 1 }, name: 'score' },
  { key: { 'matches.strengh': 1 }, name: 'strength' },
];

const makeUniquePhrases = async (phrases) => {
  const tokenizedPhrases = [];
  await eachPromise(phrases, async (phrase) => {
    const { tokens } = await elastic.analyze(ELASTIC_INDEX, { text: phrase });
    const tokenizedPhrase = tokens.map(t => t.token).join(' ');
    if (tokenizedPhrase) tokenizedPhrases.push(tokenizedPhrase);
  });
  return [...new Set(tokenizedPhrases)];
};

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
    const phrases = await makeUniquePhrases(keywordMap[channel]);

    if (!phrases.length) {
      log(chalk`{yellow NO SEARCH PHRASES FOUND.}`);
      return;
    }

    const query = buildQuery(phrases);
    log(chalk`{gray Begin index analysis for the} {blue ${channel}} {gray keyword group...}`);
    log(chalk`{gray Using search phrases...}`);
    log(chalk`{white ${phrases.join(' ')}}`);

    const { count } = await elastic.count(ELASTIC_INDEX, ELASTIC_TYPE, { query });
    log(chalk`{gray Found} {white ${count}} {gray total hits for} {blue ${channel}}`);

    let maxScore = 0;
    let offset = 0;
    let hasMore = count > offset;
    let after;
    const totalPages = Math.ceil(count / batchSize);
    const bar = new ProgressBar('[:current/:total] Complete :percent (ETA: :etas)', {
      total: totalPages,
    });

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

      offset += length;
      hasMore = count > offset;
      bar.tick();
    });
    log(chalk`{gray Index analysis for} {blue ${channel}} {gray complete.}`);
  });
};
