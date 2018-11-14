const h2p = require('html2plaintext');

module.exports = (html) => {
  if (!html) return '';
  const stripped = h2p(String(html));
  return stripped.replace(/[\r\n\f\v\t\b\\]/g, ' ').replace(/\s+/g, ' ').replace(/"/g, "'").trim();
};
