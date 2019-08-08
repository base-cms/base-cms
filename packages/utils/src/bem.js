const { isArray } = Array;

const applyModifiers = (name, mods) => {
  if (!isArray(mods)) return [];
  return mods.filter(mod => mod).map(mod => `${name}--${mod}`);
};

module.exports = {
  applyModifiers,
};
