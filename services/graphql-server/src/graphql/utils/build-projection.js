const getProjection = require('./get-projection');

module.exports = ({ info, type } = {}) => {
  const { fieldNodes, schema, fragments } = info;
  return getProjection(
    schema,
    schema.getType(type),
    fieldNodes[0].selectionSet,
    fragments,
  );
};
