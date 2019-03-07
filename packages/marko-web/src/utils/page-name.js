const path = require('path');

module.exports = (baseDir, templatePath) => {
  const parsed = path.parse(templatePath);
  const parts = parsed.dir.replace(baseDir, '').split('/').filter(v => v);
  parts.push(parsed.name.replace('.marko', ''));
  return parts.join('.').toLowerCase();
};
