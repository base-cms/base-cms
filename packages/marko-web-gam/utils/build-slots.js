const { isObject } = require('@base-cms/utils');
const buildSizeMapping = require('./build-size-mapping');

const { isArray } = Array;

module.exports = (slots) => {
  if (!isObject(slots)) return [];
  return Object.keys(slots)
    .map(id => ({ ...slots[id], id }))
    .filter(slot => slot.path && isArray(slot.size))
    .map(({
      id,
      path,
      size,
      sizeMapping,
    }) => {
      const mappings = buildSizeMapping(sizeMapping);
      return `googletag.defineSlot('${path}', ${JSON.stringify(size)}, '${id}')${mappings}.addService(googletag.pubads());`;
    });
};
