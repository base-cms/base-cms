const { get } = require('@base-cms/object-path');

module.exports = ({ coreConfig, format, name }) => (req, res, next) => {
  const headers = coreConfig.getAsObject(`fileExtensions.${format}`);
  Object.keys(headers).forEach(k => res.set(k, headers[k]));

  const download = get(req, 'query.download');
  if (typeof download !== 'undefined') res.set('Content-Disposition', `attachment; filename="${name}-${Date.now()}"`);

  next();
};
