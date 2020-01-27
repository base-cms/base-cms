const { asyncRoute } = require('@base-cms/utils');

module.exports = ({ format, name }) => asyncRoute(async (req, res, next) => {
  switch (format) {
    // @todo make config map { extension: [Content-Type header value]}
    case 'txt':
      res.set('Content-Type', 'text/plain');
      break;

    case 'json':
      res.set('Content-Type', 'application/json');
      break;

    default:
      break;
  }
  if (Object.prototype.hasOwnProperty.call(req.query, ['download'])) {
    const filename = `export-${Date.now()}-${name}`;
    res.set('Content-Disposition', `attachment; filename="${filename}"`);
  }
  next();
});
