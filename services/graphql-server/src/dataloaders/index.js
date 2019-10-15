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
  platformAsset: createProjectLoader({ basedb, modelName: 'platform.Asset' }),
  platformContent: createProjectLoader({ basedb, modelName: 'platform.Content' }),
  platformEntity: createProjectLoader({ basedb, modelName: 'platform.Entity' }),
  platformProduct: createProjectLoader({ basedb, modelName: 'platform.Product' }),
  platformTaxonomy: createProjectLoader({ basedb, modelName: 'platform.Taxonomy' }),
  platformUser: createProjectLoader({ basedb, modelName: 'platform.User' }),
  websiteOption: createProjectLoader({ basedb, modelName: 'website.Option' }),
  websiteSection: createProjectLoader({ basedb, modelName: 'website.Section' }),
  magazineIssue: createProjectLoader({ basedb, modelName: 'magazine.Issue' }),
  magazineSection: createProjectLoader({ basedb, modelName: 'magazine.Section' }),
  emailSection: createProjectLoader({ basedb, modelName: 'email.Section' }),
});
