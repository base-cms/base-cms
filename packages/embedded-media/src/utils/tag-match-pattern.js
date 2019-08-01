const escapeRegex = require('escape-string-regexp');
const {
  DB_TAG_END,
  DB_TAG_START,
  TAG_TYPE_ATTR_NAME,
} = require('../constants');

const start = escapeRegex(DB_TAG_START);
const end = escapeRegex(DB_TAG_END);
const type = escapeRegex(TAG_TYPE_ATTR_NAME);
module.exports = new RegExp(`${start}(?=\\s${type}=).+?(?<=\\s)${end}`, 'gi');
