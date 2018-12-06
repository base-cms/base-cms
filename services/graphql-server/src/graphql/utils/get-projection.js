const { keys } = Object;

module.exports = (map, selected) => keys(map)
  .filter(key => selected.includes(key))
  .reduce((o, key) => ({ ...o, ...map[key].projection || {} }), {});
