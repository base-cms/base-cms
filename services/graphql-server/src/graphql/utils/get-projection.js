const { keys } = Object;

module.exports = (type, selected) => {
  const map = (type.ofType || type).getFields();
  return keys(map)
    .filter(key => selected.includes(key))
    .reduce((o, key) => ({ ...o, ...map[key].projection || {} }), {});
};
