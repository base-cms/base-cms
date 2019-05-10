const { isObject } = require('@base-cms/utils');
const buildSizeMapping = require('./build-size-mapping');

const { isArray } = Array;

module.exports = (adUnits) => {
  const definitions = [];
  if (!isObject(adUnits)) return definitions;

  const slots = Object.keys(adUnits).map(id => ({ ...adUnits[id], id }));

  slots.filter(slot => slot.path && slot.outOfPage)
    .forEach(({ path, id }) => {
      definitions.push(`googletag.defineOutOfPageSlot('${path}', '${id}').addService(googletag.pubads());`);
    });

  slots.filter(slot => slot.path && isArray(slot.size))
    .forEach(({
      id,
      path,
      size,
      sizeMapping,
    }) => {
      const mappings = buildSizeMapping(sizeMapping);
      definitions.push(`googletag.defineSlot('${path}', ${JSON.stringify(size)}, '${id}')${mappings}.addService(googletag.pubads());`);
    });
  return definitions;
};
