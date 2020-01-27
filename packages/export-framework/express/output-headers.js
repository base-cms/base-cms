const { asyncRoute } = require('@base-cms/utils');
const { get } = require('@base-cms/object-path');

module.exports = ({ coreConfig, format, name }) => asyncRoute(async (req, res, next) => {
  const headers = coreConfig.getAsObject(`typeHeaders.${format}`);
  Object.keys(headers).forEach(k => res.set(k, headers[k]));

  const download = get(req, 'query.download');
  if (typeof download !== 'undefined') res.set('Content-Disposition', `attachment; filename="export-${Date.now()}-${name}"`);

  next();
});
