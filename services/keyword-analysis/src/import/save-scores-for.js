const chalk = require('chalk');
const ProgressBar = require('progress');
const base4 = require('../base4');
const elastic = require('../elastic');
const { index: ELASTIC_INDEX, type: ELASTIC_TYPE } = require('../elastic/index-settings');
const { whilstPromise, eachSeriesPromise } = require('../utils/async');
const buildQuery = require('./build-elastic-query');

const { log } = console;

const buildBody = (query, size, after) => ({
  query,
  size,
  _source: false,
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
  { key: { strengh: 1 }, name: 'strength' },
];

const makeUniquePhrases = async (phrases) => {
  const tokenizedPhrases = [];
  await eachSeriesPromise(phrases, async (phrase) => {
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
  log(chalk`{dim Cleared destination Mongo collection.}`);

  await eachSeriesPromise(Object.keys(keywordMap), async (channel) => {
    const phrases = await makeUniquePhrases(keywordMap[channel]);

    if (!phrases.length) {
      log(chalk`{yellow NO SEARCH PHRASES FOUND.}`);
      return;
    }

    const query = buildQuery(phrases);
    log(chalk`{dim Begin index analysis for the} {blue ${channel}} {dim keyword group...}`);
    log(chalk`{dim Using search phrases...}`);
    log(chalk`{white ${phrases.join(' ')}}`);

    const { count } = await elastic.count(ELASTIC_INDEX, ELASTIC_TYPE, { query });
    log(chalk`{dim Found} {white ${count}} {dim total hits for} {blue ${channel}}`);

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
      const toInsert = [];
      results.hits.forEach((hit) => {
        const {
          _id,
          _score: score,
          sort,
          matched_queries: matched,
        } = hit;
        const contentId = Number(_id);
        const strength = maxScore > 0 ? score / maxScore : 0;

        toInsert.push({
          contentId,
          channel,
          score,
          strength,
          matched,
        });

        after = sort;
      });
      await collection.insertMany(toInsert);

      offset += length;
      hasMore = count > offset;
      bar.tick();
    });
    log(chalk`{dim Index analysis for} {blue ${channel}} {dim complete.}`);
  });
};
