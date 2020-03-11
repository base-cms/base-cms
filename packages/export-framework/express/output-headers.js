const { get } = require('@base-cms/object-path');
const moment = require('moment');

module.exports = ({ coreConfig, format, name }) => (req, res, next) => {
  const headers = coreConfig.getAsObject(`fileExtensions.${format}`);
  Object.keys(headers).forEach(k => res.set(k, headers[k]));

  const download = get(req, 'query.download');
  const date = moment().format('YYYY-MM-DDTHH:mm');
  if (typeof download !== 'undefined') res.set('Content-Disposition', `attachment; filename="${date}-${name}"`);

  next();
};
