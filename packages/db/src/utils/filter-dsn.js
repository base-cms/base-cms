/**
 * Filters sensitive information (such as passwords) out of a MongoDB connection URI
 *
 * @param {Connection} connection The MongoDB connection object.
 * @return {string} The filtered MongoDB connection URI.
 */
const { get } = require('@base-cms/object-path');

const filter = (connection) => {
  const url = get(connection, 's.url');
  const pwd = get(connection, 's.options.password');
  if (pwd) return `${url}`.replace(pwd, '*****');
  return url;
};

module.exports = filter;
