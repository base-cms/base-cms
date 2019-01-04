const setupElastic = require('./setup-elastic');
const popluateIndex = require('./populate-index');
const loadKeywords = require('./load-keywords');
const saveScoresFor = require('./save-scores-for');

module.exports = async ({ batchSize, populate, saveToMongo }) => {
  await setupElastic(populate);
  if (populate) {
    await popluateIndex(batchSize);
  }
  if (saveToMongo) {
    const keywordMap = await loadKeywords();
    await saveScoresFor(keywordMap, batchSize);
  }
};
