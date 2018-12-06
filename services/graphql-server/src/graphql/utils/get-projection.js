const { keys } = Object;
const { isArray } = Array;

module.exports = (type, selected) => {
  const t = type.ofType || type;
  const { requiresProject } = t;
  const fields = isArray(requiresProject) ? selected.concat(requiresProject) : selected;
  const map = t.getFields();
  return keys(map)
    .filter(key => fields.includes(key))
    .reduce((o, key) => ({ ...o, ...map[key].projection || {} }), {});
};
