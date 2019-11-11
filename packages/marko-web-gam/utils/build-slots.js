const { isObject } = require('@base-cms/utils');
const buildTargeting = require('./build-targeting');
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
      targeting,
    }) => [
      `googletag.defineSlot('${path}', ${JSON.stringify(size)}, '${id}')`,
      buildTargeting(targeting),
      buildSizeMapping(sizeMapping),
      'addService(googletag.pubads());',
    ].filter(v => v).join('.'));
};
