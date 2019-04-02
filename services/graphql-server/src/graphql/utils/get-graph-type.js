const getType = (type) => {
  if (!type.ofType) return type;
  return getType(type.ofType);
};

module.exports = getType;
