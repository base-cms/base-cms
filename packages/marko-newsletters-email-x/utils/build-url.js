const { URLSearchParams } = require('url');

module.exports = ({
  uri,
  action,
  id,
  query,
} = {}) => {
  const search = new URLSearchParams(query);
  return `${uri}/${action}/${id}?${search}`;
};
