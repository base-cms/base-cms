const getProjection = require('./get-projection');

module.exports = ({
  queryInfo,
  basedb,
  type,
  model,
  id,
} = {}) => {
  const { fieldNodes, schema, fragments } = queryInfo;
  const projection = getProjection(
    schema,
    schema.getType(type),
    fieldNodes[0].selectionSet,
    fragments,
  );
  return basedb.findOne(model, { _id: id }, { projection });
};
