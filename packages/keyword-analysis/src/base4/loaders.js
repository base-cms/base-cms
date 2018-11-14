const DataLoader = require('dataloader');
const base4 = require('./index');

module.exports = {
  taxonomyLoader: new DataLoader(
    keys => base4.find('platform.Taxonomy', { _id: { $in: keys } }, {}, true),
    { cacheKeyFn: key => key.valueOf() },
  ),
};
