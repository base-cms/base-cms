const { isArray } = Array;
const { stringify } = JSON;

module.exports = (sizeMapping) => {
  if (!isArray(sizeMapping)) return '';
  const addSizeCalls = sizeMapping.map(({ viewport, size }) => `addSize(${stringify(viewport)}, ${stringify(size)})`);
  if (!addSizeCalls.length) return '';
  return `defineSizeMapping(googletag.sizeMapping().${addSizeCalls.join('.')}.build())`;
};
