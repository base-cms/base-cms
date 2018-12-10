/* eslint-disable no-param-reassign */
const DataLoader = require('dataloader');
const {
  mapKeys,
  mapQuery,
  projectCacheKey,
  returnResults,
  runQueries,
} = require('./utils');

const createProjectLoader = ({ basedb, modelName, criteria }) => new DataLoader(async (keys) => {
  const map = mapKeys(keys);
  const queryMap = mapQuery(map);
  const resultSets = await runQueries({
    queryMap,
    basedb,
    modelName,
    criteria,
  });
  return returnResults(resultSets, keys);
}, { cacheKeyFn: projectCacheKey });

module.exports = basedb => ({
  /**
   *
   */
  activeWebsiteSections: createProjectLoader({
    basedb,
    modelName: 'website.Section',
    criteria: { status: 1 },
  }),
});
