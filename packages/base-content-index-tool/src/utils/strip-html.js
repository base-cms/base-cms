const h2p = require('html2plaintext');

module.exports = (html) => {
  const stripped = h2p(!html ? '' : String(html));
  return stripped.replace(/[\r\n\f\v\t]/g, ' ').replace(/\s+/g, ' ').trim();
};
