/* eslint-disable no-param-reassign */
const DataLoader = require('dataloader');
const {
  mapKeys,
  mapQuery,
  projectCacheKey,
  returnResults,
  runQueries,
} = require('./utils');

const createProjectLoader = ({ basedb, modelName }) => new DataLoader(async (keys) => {
  const map = mapKeys(keys);
  const queryMap = mapQuery(map);
  const resultSets = await runQueries({ queryMap, basedb, modelName });
  return returnResults(resultSets, keys);
}, { cacheKeyFn: projectCacheKey });

module.exports = basedb => ({
  /**
   *
   */
  websiteSections: createProjectLoader({ basedb, modelName: 'website.Section' }),
});
