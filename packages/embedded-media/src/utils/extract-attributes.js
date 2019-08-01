const cheerio = require('cheerio');
const { htmlEntities } = require('@base-cms/html');
const { camelize } = require('@base-cms/inflector');
const {
  DB_TAG_END,
  DB_TAG_START,
} = require('../constants');

/**
 * @param {string} match The database tag match, e.g. `%{[ ... ]}%`.
 */
module.exports = (match) => {
  const html = match.replace(DB_TAG_START, '<span').replace(DB_TAG_END, '></span>');
  const $ = cheerio.load(html, { decodeEntities: false });
  const obj = $('span').data() || {};
  return Object.keys(obj).reduce((o, k) => {
    const key = camelize(k.replace('embed', ''));
    return ({ ...o, [key]: htmlEntities.decode(obj[k]) });
  }, {});
};
