const { isObject } = require('@base-cms/utils');

const { isArray } = Array;

module.exports = (slots) => {
  if (!isObject(slots)) return [];
  return Object.keys(slots)
    .map(id => ({ ...slots[id], id }))
    .filter(slot => slot.path && isArray(slot.size))
    .map(({ id, path, size }) => `googletag.defineSlot('${path}', ${JSON.stringify(size)}, '${id}').addService(googletag.pubads());`);
};
