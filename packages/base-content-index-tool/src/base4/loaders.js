const DataLoader = require('dataloader');
const base4 = require('./index');

module.exports = {
  taxonomyLoader: new DataLoader(
    keys => base4.find('platform.Taxonomy', { _id: { $in: keys } }),
    { cacheKeyFn: key => key.valueOf() },
  ),
};
